const path = require('path');
const { extendConfig } = require('hardhat/config');

require('./tasks/compile.js');
require('./tasks/docgen.js');

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
    userConfig.docgen,
  );

  for (const compiler of config.solidity.compilers) {
    const outputSelection = compiler.settings.outputSelection['*']['*'];

    if (!outputSelection.includes('devdoc')) {
      outputSelection.push('devdoc');
    }

    if (!outputSelection.includes('userdoc')) {
      outputSelection.push('userdoc');
    }
  }
});
