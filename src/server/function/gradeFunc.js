const Log = require('../common/log');
const Https = require('https');
// get grade
function gradeFunc(userData, option, res, origin) {
  option.path = `/gpa${userData.type}`;
  const scuReq = Https.request(option, response => {
    let scuData = '';
    response.on('data', d => {
      scuData += d;
    });
    response.on('end', () => {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': origin,
      });
      res.end(scuData);
      Log.Tip(`name(${userData.uid}): Grade`);
    });
  });
  scuReq.end(`uid=${userData.uid}&password=${userData.password}`);
}

module.exports = gradeFunc;
