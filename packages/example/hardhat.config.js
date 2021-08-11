require('@hardhat-docgen/core');

module.exports = {
  docgen: {
    path: 'docs/',
    clear: true,
  },
  solidity: {
    compilers: [{ version: '0.8.2', }],
  },
  paths: {
    sources: 'src',
  },
};
