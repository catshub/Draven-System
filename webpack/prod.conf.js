const Webpack = require('webpack');
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
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ],
};
module.exports = Merge(baseWebpackConf, devWebpackConf);
