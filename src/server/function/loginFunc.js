const Http = require('http');
const iconv = require('iconv-lite');
const QueryString = require('querystring');
const { Log, Tip } = require('../common/log');
const getName = require('../common/getName');

// login
function loginFunc(userData, option, res, origin, nameApi) {
  const scuReq = Http.request(option, response => {
    let scuData = '';
    response.on('data', d => {
      scuData += iconv.decode(d, 'gbk');
    });
    response.on('end', () => {
      if (scuData.includes('学分制综合教务')) {
        const cookie = response.headers['set-cookie'][0].split(';')[0];
        getName(cookie, userData.zjh).then(name => {
          // cookie += `;name=${name}`;
          res.setHeader('Set-Cookie', cookie);
          res.writeHead(200, {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': true,
          });
          const resData = JSON.stringify({ cookie, name });
          res.end(resData);
          Tip(`${name}(${userData.zjh}): Login`);
        });
      } else {
        res.writeHead(200, {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': true,
        });
        res.end('登录失败');
      }
    });
  });
  // scuReq.setHeader('Content-Length', Buffer.byteLength(userData));
  scuReq.end(QueryString.stringify(userData));
}

module.exports = loginFunc;
