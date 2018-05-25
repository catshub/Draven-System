const Http = require('http');
const iconv = require('iconv-lite');
const QueryString = require('querystring');
const { Log, Tip } = require('../common/log');
const Api = require('./api');

// getName
function getName(Cookie, zjh) {
  return new Promise(resolve => {
    const scuReq = Http.request(Api.sTop, response => {
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

module.exports = getName;
