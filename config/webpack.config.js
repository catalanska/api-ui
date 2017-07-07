const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', 'whatwg-fetch', './src/main.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
    }),
    new ExtractTextPlugin('src/main.css'),
  ],
  module: {
    loaders: [
        { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
        { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
    ],
  },
};
