const Log = require('../common/log');
const Http = require('http');
// classroom
function classroomFunc(data, option, res, origin) {
  option.path = `/cir${data.type}`;
  const scuReq = Http.request(option, response => {
    let scuData = '';
    response.on('data', d => {
      scuData += d;
    });
    response.on('end', () => {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': origin,
      });
      res.end(scuData);
      Log.Tip('name(): Classroom');
    });
  });
  scuReq.end(data.query);
}

module.exports = classroomFunc;
