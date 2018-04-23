module.exports = {
  apps: [
    {
      name: 'draven',
      script: `${__dirname}/server.js`,
      watch: true,
      env: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
