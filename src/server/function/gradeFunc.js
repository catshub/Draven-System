const Log = require('../common/log');
const Https = require('https');
const getCookie = require('../common/getCookie');
// get grade
function gradeFunc(userData, option, res, origin) {
  option.path = `/gpa${userData.type}`;
  const scuReq = Https.request(option, response => {
    let scuData = '';
    response.on('data', d => {
      scuData += d;
    });
    response.on('end', () => {
      getCookie(userData.uid, userData.password).then(cookie => {
        if (cookie !== 0) res.setHeader('Set-Cookie', cookie);
        console.log(cookie);
        res.writeHead(200, {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Credentials': true,
        });
        res.end(scuData);
        Log.Tip(`name(${userData.uid}): Grade`);
      });
    });
  });
  scuReq.end(`uid=${userData.uid}&password=${userData.password}`);
}

module.exports = gradeFunc;
