const Webpack = require('webpack');
const Merge = require('webpack-merge');
const baseWebpackConf = require('./base.conf.js');

const devWebpackConf = {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './public',
    // inline: true,
    port: 8080,
    // open: true,
    stats: { modules: false },
    hot: true,
    watchOptions: {
      aggregateTimeout: 1000,
      ignored: /node_modules/,
    },
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ],
};
module.exports = Merge(baseWebpackConf, devWebpackConf);
