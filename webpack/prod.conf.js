// const Webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          beautify: false,
        },
      },
      parallel: true,
    }),
    // new ExtractTextPlugin('static/css/[name].css'),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'src/common/static/index.html',
    //   favicon: 'src/common/static/images/x-logo.png',
    //   inject: true,
    //   minify: {},
    //   hash: true,
    //   cache: true,
    // }),
  ],
};
module.exports = Merge(baseWebpackConf, devWebpackConf);
