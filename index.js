const fs = require('fs');
const path = require('path');
const { extendConfig } = require('hardhat/config');

const {
  TASK_COMPILE,
} = require('hardhat/builtin-tasks/task-names');

extendConfig(function (config, userConfig) {
  config.docgen = Object.assign(
    {
      runOnCompile: false,
    },
    userConfig.docgen
  );
});

const NAME = 'docgen';
const DESC = 'Generate NatSpec documentation automatically on compilation';

task(NAME, DESC, async function (args, hre) {
  const fullNames = await hre.artifacts.getAllFullyQualifiedNames();

  const output = {};

  for (let fullName of fullNames) {
    const [source, name] = fullName.split(':');

    const { devdoc = {}, userdoc = {} } = (
      await hre.artifacts.getBuildInfo(fullName)
    ).output.contracts[source][name];


    const { title, author, details } = devdoc;
    const { notice } = userdoc;

    // merge devdoc and userdoc comments

    const events = Object.keys(
      { ...devdoc.events }
    ).reduce(function (acc, el) {
      acc[el] = {
        ...devdoc.events[el],
        ...userdoc.events[el],
      };

      return acc;
    }, {});

    const stateVariables = Object.keys(
      { ...devdoc.stateVariables }
    ).reduce(function (acc, el) {
      acc[el] = {
        ...devdoc.stateVariables[el],
        ...userdoc.methods[`${ el }()`],
      };

      return acc;
    }, {});

    const methods = Object.keys(
      { ...devdoc.methods }
    ).reduce(function (acc, el) {
      acc[el] = {
        ...devdoc.methods[el],
        ...userdoc.methods[el],
      };

      return acc;
    }, {});

    output[fullName] = {
      source,
      name,
      title,
      author,
      details,
      notice,
      events,
      stateVariables,
      methods,
    };
  }

  const base64 = Buffer.from(JSON.stringify(output)).toString('base64');
  const jsonp = `loadDocumentation = function () { return JSON.parse(atob('${ base64 }', 'base64').toString('ascii')) }`;

  const destination = path.resolve(hre.config.paths.root, 'documentation.js');
  fs.writeFileSync(destination, `${ jsonp }\n`, { flag: 'w' });
});

task(TASK_COMPILE, async function (args, hre, runSuper) {
  for (let compiler of hre.config.solidity.compilers) {
    compiler.settings.outputSelection['*']['*'].push('devdoc');
    compiler.settings.outputSelection['*']['*'].push('userdoc');
  }

  await runSuper();

  if (hre.config.docgen.runOnCompile) {
    await hre.run(NAME);
  }
});
