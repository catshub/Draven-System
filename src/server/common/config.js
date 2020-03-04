const jwcHost = '202.115.47.141';
const devHsot = 'http://localhost';
const prodHost = 'localhost';
const serverPort = 9000;
const serverHost = process.env.NODE_ENV === 'prod' ? prodHost : devHsot;
const domain = {
  'http://draven-system.xhuyq.me': true,
  'http://league.xhuyq.me': true,
  default: 'http://draven-system.xhuyq.me',
};
// const serverApiBase = `${serverHost}:${serverPort}/api`;
module.exports = {
  jwcHost,
  serverHost,
  serverPort,
  domain,
  // serverApiBase,
};
