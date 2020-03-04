const path = require('path')
const { WEB_ROOT } = process.env

module.exports = {
  apps: [
    {
      name: 'draven',
      script: path.resolve(__dirname, './server.js'),
      watch: true,
      ignore_watch: ['**/logs', '**/node_modules'],
      env: {
        NODE_ENV: 'dev',
      },
      env_production: {
        NODE_ENV: 'prod',
      },
      out_file: path.resolve(WEB_ROOT, './logs/draven/out.log'),
      error_file: path.resolve(WEB_ROOT, './logs/draven/error.log'),
    },
  ],
}
