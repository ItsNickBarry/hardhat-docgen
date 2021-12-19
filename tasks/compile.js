const {
  TASK_COMPILE,
} = require('hardhat/builtin-tasks/task-names');

task(TASK_COMPILE, async function (args, hre, runSuper) {
  for (let compiler of hre.config.solidity.compilers) {
    compiler.settings.outputSelection['*']['*'].push('devdoc');
    compiler.settings.outputSelection['*']['*'].push('userdoc');
  }

  await runSuper();

  if (hre.config.docgen.runOnCompile) {
    await hre.run('docgen');
  }
});
