const Http = require('http');
const iconv = require('iconv-lite');
const API = require('../common/api');

function getCookie(zjh, mm) {
  return new Promise(resolve => {
    const realReq = Http.request(API.LoginAction, response => {
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
    realReq.end(`zjh=${zjh}&mm=${mm}`);
  });
}
module.exports = getCookie;
