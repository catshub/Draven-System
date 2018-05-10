module.exports = {
  apps: [
    {
      name: 'draven',
      script: `${__dirname}/server.js`,
      watch: false,
      env: {
        NODE_ENV: 'dev',
      },
    },
  ],
};
