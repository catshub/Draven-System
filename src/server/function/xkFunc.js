const Http = require('http');
const iconv = require('iconv-lite');
const QueryString = require('querystring');
const { Log, Tip } = require('../common/log');

// 云抢课
function takeCourse(query, Cookie, option, resolve, name, zjh, count) {
  const cloudReq = Http.request(option, response => {
    let scuData = '';
    response.on('data', d => {
      scuData += iconv.decode(d, 'gbk');
    });
    response.on('end', () => {
      if (!/(没有课余量)/.test(scuData)) {
        resolve({ scuData, count });
      } else {
        setTimeout(() => {
          if (count % 1000 === 0) Log(`${name}(${zjh}): 抢课中.... 抢课次数: ${count}`);
          takeCourse(query, Cookie, option, resolve, name, zjh, count + 1);
        }, 500);
      }
    });
  });
  cloudReq.setHeader('Cookie', Cookie);
  // cloudReq.setHeader('Content-Length', Buffer.byteLength(query));
  cloudReq.end(query);
}
// 选课
function XkAction(queryData, option, Cookie = 'none', res, origin, xkFirst) {
  const stopReg = />((\S+上课时间冲突)|(你已经选择了课程[^<]+)|(选课成功[^<]+))/;
  const errorReg = /(对不起、非选课阶段不允许选课)|(请您登录后再使用)|(500 Servlet Exception)/;
  const continueReg = /(没有课余量)/;
  const querySecond = QueryString.stringify(queryData.query.second);
  const queryThird = QueryString.stringify(queryData.query.third);
  const { zjh, name } = queryData.user;
  const reqFirst = Http.request(xkFirst, resFirst => {
    resFirst.on('data', () => {});
    resFirst.on('end', () => {
      const reqSecond = Http.request(option, resSecond => {
        resSecond.on('data', () => {});
        resSecond.on('end', () => {
          const realReq = Http.request(option, response => {
            let scuData = '';
            response.on('data', d => {
              scuData += iconv.decode(d, 'gbk');
            });
            response.on('end', () => {
              res.writeHead(200, { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Credentials': true });
              if (stopReg.test(scuData)) {
                Log(`${name}(${zjh}): ${stopReg.exec(scuData)[1]}`);
                res.end(stopReg.exec(scuData)[1]);
              } else if (continueReg.test(scuData)) {
                Tip(`${name}(${zjh}): 开启抢课...`);
                res.end('已开启抢课...');
                const cloud = new Promise(resolve => {
                  takeCourse(queryThird, Cookie, option, resolve, name, zjh, 1);
                });
                cloud.then(resData => {
                  if (/你已经选择了课程/.test(resData.scuData)) Tip(`${name}(${zjh}): 抢课完成,抢课次数: ${resData.count}`);
                  Tip(`${name}(${zjh}): 抢课结束,结果不明 ${resData.scuData}`);
                });
              } else if (errorReg.test(scuData)) {
                Log(`${name}(${zjh}): ${errorReg.exec(scuData)[0]}`);
                res.end(errorReg.exec(scuData)[0]);
              } else {
                Error(`${name}(${zjh}): ${scuData}`);
                res.end('出现错误');
              }
            });
          });
          realReq.setHeader('Cookie', Cookie);
          // realReq.setHeader('Content-Length', Buffer.byteLength(queryThird));
          realReq.end(queryThird);
        });
      });
      reqSecond.setHeader('Cookie', Cookie);
      reqSecond.end(querySecond);
    });
  });
  reqFirst.setHeader('Cookie', Cookie);
  reqFirst.end();
}

module.exports = XkAction;
