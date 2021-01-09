# Hardhat Docgen

Generate NatSpec documentation automatically on compilation with Hardhat.

## Installation

```bash
yarn add --dev hardhat-docgen
```

## Usage

Load plugin in Hardhat config:

```javascript
require('hardhat-docgen');
```

Add configuration under the `docgen` key:

| option | description | default |
|-|-|-|
| `runOnCompile` | whether to automatically generate documentation during compilation | `false` |

```javascript
docgen: {
  runOnCompile: true,
}
```

The included Hardhat task may be run manually; however, it is imperative that the `compile` task be run at least once after plugin installation to ensure that the correct compiler options are set:

```bash
yarn run hardhat docgen
```
