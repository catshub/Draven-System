const Http = require('http');
const Api = require('./common/api');
const config = require('./common/config');
const gradeAction = require('./function/gradeFunc');
const loginAction = require('./function/loginFunc');
const xkAction = require('./function/xkFunc');

// server
Http.createServer((req, res) => {
  const origin = process.env.NODE_ENV === 'prod' ? 'http://draven-system.xhuyq.me' : req.headers.origin;
  let data = '';
  switch (req.url) {
    case '/loginAction':
      req.on('data', d => {
        data += d;
      });
      req.on('end', () => loginAction(JSON.parse(data), Api.LoginAction, res, origin, Api.sTop));
      break;
    case '/xkAction':
      req.on('data', d => {
        data += d;
      });
      req.on('end', () => {
        xkAction(JSON.parse(data), Api.XkAction, req.headers.cookie, res, origin, Api.XkFirst);
      });
      break;
    case '/grade':
      req.on('data', d => {
        data += d;
      });
      req.on('end', () => gradeAction(JSON.parse(data), Api.GradeAction, res, origin));
      break;
    default:
      res.end('none');
      break;
  }
}).listen(config.serverPort, () => {
  console.log(`server on ${config.serverHost}:${config.serverPort}`);
});
