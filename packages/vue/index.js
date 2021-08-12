const webpack = require('webpack');

const webpackConfig = require('./webpack.config.js');

module.exports = async (outputDirectory, data) => new Promise(function (resolve) {
  const output = {};

  for (const contractName in data) {
    const [source, name] = contractName.split(':');

    const { abi, devdoc = {}, userdoc = {} } = data[contractName].output.contracts[source][name];

    const { title, author, details } = devdoc;
    const { notice } = userdoc;

    // derive external signatures from internal types

    const getSigType = function ({ type, components = [] }) {
      return type.replace('tuple', `(${components.map(getSigType).join(',')})`);
    };

    const members = abi.reduce(function (acc, el) {
      // constructor, fallback, and receive do not have names
      let name = el.name || el.type;
      let inputs = el.inputs || [];
      acc[`${name}(${inputs.map(getSigType)})`] = el;
      return acc;
    }, {});

    // associate devdoc and userdoc comments with abi elements

    Object.keys(devdoc.events || {}).forEach(function (sig) {
      Object.assign(
        members[sig] || {},
        devdoc.events[sig]
      );
    });

    Object.keys(devdoc.stateVariables || {}).forEach(function (name) {
      Object.assign(
        members[`${name}()`] || {},
        devdoc.stateVariables[name],
        { type: 'stateVariable' }
      );
    });

    Object.keys(devdoc.methods || {}).forEach(function (sig) {
      Object.assign(
        members[sig] || {},
        devdoc.methods[sig]
      );
    });

    Object.keys(userdoc.events || {}).forEach(function (sig) {
      Object.assign(
        members[sig] || {},
        userdoc.events[sig]
      );
    });

    Object.keys(userdoc.methods || {}).forEach(function (sig) {
      Object.assign(
        members[sig] || {},
        userdoc.methods[sig]
      );
    });

    const membersByType = Object.keys(members).reduce(function (acc, sig) {
      const { type } = members[sig];
      acc[type] = acc[type] || {};
      acc[type][sig] = members[sig];
      return acc;
    }, {});

    const constructor = members[Object.keys(members).find(k => k.startsWith('constructor('))];
    const { 'fallback()': fallback, 'receive()': receive } = members;

    output[contractName] = {
      // metadata
      source,
      name,
      // top-level docs
      title,
      author,
      details,
      notice,
      // special functions
      constructor,
      fallback,
      receive,
      // docs
      events: membersByType.event,
      stateVariables: membersByType.stateVariable,
      methods: membersByType.function,
    };
  }
  webpackConfig.output = { ...webpackConfig.output, path: outputDirectory };
  webpackConfig.plugins.push(
    new webpack.EnvironmentPlugin({
      'DOCGEN_DATA': output,
    })
  );

  webpack(
    webpackConfig,
    function (error, stats) {
      resolve(error || stats.compilation.errors[0]);
    }
  );
});


