const Http = require('http');
const API = require('./common/api');
const config = require('./common/config');
const gradeFunc = require('./function/gradeFunc');
const loginFunc = require('./function/loginFunc');
const xkFunc = require('./function/xkFunc');
const classroomFunc = require('./function/classroomFunc');
const courseFunc = require('./function/courseFunc');
const busFunc = require('./function/busFunc');
const calendarFunc = require('./function/calendarFunc');

// Server
Http.createServer((req, res) => {
  const origin =
    process.env.NODE_ENV === 'prod' ? 'http://draven-system.xhuyq.me' : req.headers.origin || 'http://localhost';
  let data = '';
  req.on('data', d => {
    data += d;
  });
  req.on('end', () => {
    switch (req.url) {
      case '/loginAction':
        loginFunc(JSON.parse(data), API.LoginAction, res, origin, API.sTop);
        break;
      case '/xkAction':
        xkFunc(JSON.parse(data), API.XkAction, req.headers.cookie, res, origin, API.XkFirst);
        break;
      case '/grade':
        gradeFunc(JSON.parse(data), API.GradeAction, res, origin);
        break;
      case '/course':
        courseFunc(req.headers.cookie, API.CourseAction, res, origin);
        break;
      case '/classroom':
        classroomFunc(JSON.parse(data), API.CrAction, res, origin);
        break;
      case '/bus':
        busFunc(API.BusAction, res, origin);
        break;
      case '/calendar':
        calendarFunc(data, API.CalendarAction, res, origin);
        break;
      default:
        res.end(JSON.stringify({ res: 'none' }));
        break;
    }
  });
}).listen(config.serverPort, () => {
  console.log(`Server on ${config.serverHost}:${config.serverPort}`);
});
