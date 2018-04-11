// const Webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Merge = require('webpack-merge');
const baseWebpackConf = require('./base.conf.js');

const devWebpackConf = {
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
