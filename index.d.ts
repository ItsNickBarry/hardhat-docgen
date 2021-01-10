import 'hardhat/types/config';

declare module 'hardhat/types/config' {
  interface HardhatUserConfig {
    docgen?: {
      path?: string,
      clear?: boolean,
      runOnCompile?: boolean,
    }
  }

  interface HardhatConfig {
    docgen: {
      path: string,
      clear: boolean,
      runOnCompile: boolean,
    }
  }
}
