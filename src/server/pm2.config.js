const path = require('path');

module.exports = {
  apps: [
    {
      name: 'draven',
      script: path.resolve(__dirname, './server.js'),
      watch: [path.resolve(__dirname)],
      ignore_watch: ['**/logs', '**/node_modules'],
      env: {
        NODE_ENV: 'dev',
      },
      out_file: path.resolve(__dirname, './logs/draven-out.log'),
      error_file: path.resolve(__dirname, './logs/draven-error.log'),
    },
  ],
};
