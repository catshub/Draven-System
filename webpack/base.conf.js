const Path = require('path');
// const Webpack = require('webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { login: Path.resolve(__dirname, '../src/client/page/login/Login.js') },
  output: {
    filename: 'static/js/[name].js', // 打包文件名
    path: Path.resolve(__dirname, '../public'),
    publicPath: '/',
  },
  // devtool: 'eval-source-map',
  // devServer: {
  //   contentBase: './public',
  //   // inline: true,
  //   port: 8080,
  //   // open: true,
  //   hot: true,
  //   watchOptions: {
  //     aggregateTimeout: 1000,
  //     ignored: /node_modules/,
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader', // 编译后用来提取的loaader
      //     use: { loader: 'css-loader', options: { minimize: true } }, // 用来编译文件的loader
      //   }),
      // },
    ],
  },
  // plugins: [
  //   new Webpack.HotModuleReplacementPlugin(),
  //   new UglifyJsPlugin({
  //     // uglifyOptions: {
  //     //   compress: {
  //     //     warnings: false
  //     //   }
  //     // }
  //   }),
  //   new ExtractTextPlugin('static/css/[name].css'),
  //   new HtmlWebpackPlugin({
  //     filename: 'index.html',
  //     template: 'src/common/static/index.html',
  //     favicon: 'src/common/static/images/x-logo.png',
  //     inject: true,
  //     minify: {},
  //     hash: true,
  //     cache: true,
  //   }),
  // ],
};
