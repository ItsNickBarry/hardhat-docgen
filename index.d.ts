import 'hardhat/types/config';

declare module 'hardhat/types/config' {
  interface HardhatUserConfig {
    docgen?: {
      runOnCompile?: boolean,
    }
  }

  interface HardhatConfig {
    docgen: {
      runOnCompile: boolean,
    }
  }
}
