const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { extendConfig } = require('hardhat/config');
const { HardhatPluginError } = require('hardhat/plugins');

const webpackConfig = require('./webpack.config.js');

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

  const output = {};

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
      { ...devdoc.events, ...userdoc.events }
    ).reduce(function (acc, el) {
      acc[el] = {
        ...devdoc.events?.[el],
        ...userdoc.events?.[el],
      };

      return acc;
    }, {});

    const stateVariables = Object.keys(
      { ...devdoc.stateVariables, ...userdoc.methods }
    ).reduce(function (acc, el) {
      acc[el] = {
        ...devdoc.stateVariables?.[el],
        ...userdoc.methods?.[`${ el }()`],
      };

      return acc;
    }, {});

    const methods = Object.keys(
      { ...devdoc.methods, ...userdoc.methods }
    ).reduce(function (acc, el) {
      acc[el] = {
        ...devdoc.methods?.[el],
        ...userdoc.methods?.[el],
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

  console.log('hardhat-docgen: generating static site...');

  let error = await new Promise(function (resolve) {
    webpackConfig.output = { ...webpackConfig.output, path: outputDirectory };
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'DOCGEN_DATA': JSON.stringify(output),
        },
      })
    );

    webpack(
      webpackConfig,
      function (error, stats) {
        resolve(error || stats.compilation.errors[0]);
      }
    );
  });

  if (error) {
    throw new HardhatPluginError(error);
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
