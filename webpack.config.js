var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'eval',
  mode: 'development',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'index.html'}),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader'],
    }]
  }
};
