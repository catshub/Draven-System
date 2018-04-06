const Path = require('path');

module.exports = {
  entry: { login: Path.resolve(__dirname, '../src/client/page/login/Login.js') },
  output: {
    filename: 'static/js/[name]-[hash].js', // 打包文件名
    path: Path.resolve(__dirname, '../public'),
    publicPath: '/',
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
};
