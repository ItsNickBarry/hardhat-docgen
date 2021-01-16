const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: `${ __dirname }/src/main.js`,
  output: {
    path: process.env.HARDHAT_DOCGEN_PATH,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.EnvironmentPlugin({
      'HARDHAT_DOCGEN_DATA': process.env.HARDHAT_DOCGEN_DATA,
    }),
    new HtmlWebpackPlugin({
      title: 'Hardhat Docgen',
      template: `${ __dirname }/src/index.html`,
      filename: 'index.html',
    }),
    new VueLoaderPlugin(),
  ],
};
