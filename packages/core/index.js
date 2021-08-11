/* global hre, task */
const fs = require('fs');
const path = require('path');
const { extendConfig } = require('hardhat/config');
const { HardhatPluginError } = require('hardhat/plugins');

const {
  TASK_COMPILE,
} = require('hardhat/builtin-tasks/task-names');

extendConfig(function (config, userConfig) {
  const { root, sources } = config.paths;

  config.docgen = Object.assign(
    {
      path: './docgen',
      clear: false,
      runOnCompile: false,
      only: [`^${path.relative(root, sources)}/`],
      except: [],
    },
    userConfig.docgen
  );
});

const NAME = 'docgen';
const DESC = 'Generate NatSpec documentation automatically on compilation';

task(NAME, DESC)
  .addOptionalParam('theme', 'The theme used to render the output')
  .setAction(async ({ theme }) => {
    const config = hre.config.docgen;

    const outputDirectory = path.resolve(hre.config.paths.root, config.path);

    if (!outputDirectory.startsWith(hre.config.paths.root)) {
      throw new HardhatPluginError('resolved path must be inside of project directory');
    }

    if (outputDirectory === hre.config.paths.root) {
      throw new HardhatPluginError('resolved path must not be root directory');
    }

    if (config.clear && fs.existsSync(outputDirectory)) {
      fs.rmdirSync(outputDirectory, { recursive: true });
    }

    const output = {};
    const contractNames = await hre.artifacts.getAllFullyQualifiedNames();
    for (const contractName of contractNames) {
      if (config.only.length && !config.only.some(m => contractName.match(m))) continue;
      if (config.except.length && config.except.some(m => contractName.match(m))) continue;
      output[contractName] = await hre.artifacts.getBuildInfo(contractName);
    }
    // Default renderer
    let render = async (outputDirectory, data) => {
      if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, { recursive: true });
      }
      fs.writeFileSync(path.join(outputDirectory, 'output.json'), JSON.stringify(data, null, 4));
    };
    if (theme || config.theme) {
      render = require('@hardhat-docgen/' + (theme || config.theme));
    }
    const error = await render(outputDirectory, output);
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
