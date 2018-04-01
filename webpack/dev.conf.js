const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Merge = require('webpack-merge');
const baseWebpackConf = require('./base.conf.js');

const devWebpackConf = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', // 编译后用来提取的loaader
          use: { loader: 'css-loader', options: { minimize: true } }, // 用来编译文件的loader
        }),
      },
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './public',
    // inline: true,
    port: 8080,
    // open: true,
    hot: true,
    watchOptions: {
      aggregateTimeout: 1000,
      ignored: /node_modules/,
    },
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('static/css/[name].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/common/static/index.html',
      favicon: 'src/common/static/images/x-logo.png',
      inject: true,
      minify: {},
      hash: true,
      cache: true,
    }),
  ],
};
module.exports = Merge(baseWebpackConf, devWebpackConf);
