const Path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
// const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    login: Path.resolve(__dirname, '../src/client/page/login/Login.js'),
    index: Path.resolve(__dirname, '../src/client/index.js'),
    vendor: ['react', 'react-dom'],
  },
  output: {
    filename: 'static/js/[name]-[hash].js', // 打包文件名
    path: Path.resolve(__dirname, '../public/draven'),
    publicPath: '/draven',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new Webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new ExtractTextPlugin('static/css/[name].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/common/static/index.html',
      favicon: 'src/common/static/images/x-logo.png',
      chunks: ['vendor', 'index'],
      inject: true,
      minify: {},
      hash: false,
      cache: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'login/index.html',
      template: 'src/common/static/index.html',
      favicon: 'src/common/static/images/x-logo.png',
      chunks: ['vendor', 'login'],
      inject: true,
      minify: {},
      hash: false,
      cache: false,
    }),
    // new CompressionPlugin({
    //   test: /\.(js|css)/
    // })
  ],
};
