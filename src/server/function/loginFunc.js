const Http = require('http');
const iconv = require('iconv-lite');
const QueryString = require('querystring');
const { Log, Tip } = require('../common/log');
// getCookie
function getCookie(userData, option) {
  return new Promise(resolve => {
    const realReq = Http.request(option, response => {
      let data = '';
      response.on('data', d => {
        data += iconv.decode(d, 'gbk');
      });
      response.on('end', () => {
        if (data.includes('学分制综合教务')) {
          const cookie = response.headers['set-cookie'][0].split(';')[0];
          resolve(cookie);
        } else resolve(0);
      });
    });
    realReq.setSocketKeepAlive(true);
    // realReq.setHeader('Content-Length', Buffer.byteLength(userData));
    Log(QueryString.stringify(userData));
    realReq.end(QueryString.stringify(userData));
  });
}

// getName
function getName(Cookie, option) {
  return new Promise(resolve => {
    const scuReq = Http.request(option, response => {
      let scuData = '';
      response.on('data', d => {
        scuData += iconv.decode(d, 'gbk');
      });
      response.on('end', () => {
        const reg = /欢迎光临&nbsp;(\S+)&nbsp;\|/;
        const name = reg.exec(scuData)[1];
        resolve(name);
      });
    });
    scuReq.setHeader('Cookie', Cookie);
    scuReq.end();
  });
}

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
        getName(cookie, nameApi).then(name => {
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
