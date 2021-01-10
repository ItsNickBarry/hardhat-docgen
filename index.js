const fs = require('fs');
const path = require('path');
const { extendConfig } = require('hardhat/config');

const generateHTML = require('./html.js');

const {
  TASK_COMPILE,
} = require('hardhat/builtin-tasks/task-names');

extendConfig(function (config, userConfig) {
  config.docgen = Object.assign(
    {
      path: './docgen',
      clear: false,
      runOnCompile: false,
    },
    userConfig.docgen
  );
});

const NAME = 'docgen';
const DESC = 'Generate NatSpec documentation automatically on compilation';

task(NAME, DESC, async function (args, hre) {
  const config = hre.config.docgen;

  const output = [];

  const outputDirectory = path.resolve(hre.config.paths.root, config.path);

  if (config.clear) {
    fs.rmdirSync(outputDirectory, { recursive: true });
  }

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  const fullNames = await hre.artifacts.getAllFullyQualifiedNames();

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

    // TODO: use relative url
    const url = path.resolve(outputDirectory, fullName);

    output.push({
      source,
      name,
      title,
      author,
      details,
      notice,
      events,
      stateVariables,
      methods,
      url,
    });
  }

  const navLinks = output.map(function ({ name, source, url }) {
    // TODO: define CSS separately
    return `<a
      class="border-gray-500 border py-2 px-4 rounded"
      href="${ url }.html"
    >${ name } - ${ source }</a>`;
  }).join('');

  for (let el of output) {
    const html = generateHTML(el, navLinks);
    const { url } = el;

    if (!fs.existsSync(path.dirname(url))) {
      fs.mkdirSync(path.dirname(url), { recursive: true });
    }

    fs.writeFileSync(`${ url }.html`, html, { flag: 'w' });
  }
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
