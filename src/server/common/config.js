const jwcHost = 'http://202.115.47.141';
const devHsot = 'http://localhost';
const prodHost = 'http://draven-system.xhuyq.me';
const serverPort = 8101;
const serverHost = process.env.NODE_ENV === 'dev' ? devHsot : prodHost;
const serverApiBase = `${serverHost}:${serverPort}/api`;
module.exports = {
  jwcHost, serverHost, serverPort, serverApiBase
};
