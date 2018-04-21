const host = '202.115.47.141';
const port = 80;
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
const CrossOrigin = /http:\/\/draven-system.xhuyq.me|http:\/\/localhost:8080/;
const api = {
  Login: 'http://localhost:8101/loginAction',
  CrossOrigin,
  LoginAction: {
    host,
    port,
    method: 'post',
    path: '/loginAction.do',
    headers,
  },
  XkAction: {
    host,
    port,
    method: 'post',
    path: '/xkAction.do',
    headers,
  },
  sTop: {
    host,
    port,
    path: '/menu/s_top.jsp',
    method: 'GET',
    headers,
  },
  XkFirst: {
    host,
    port,
    path: '/xkAction.do?actionType=-1',
    method: 'GET',
    headers,
  },
  GradeAction: {
    host: 'g.scuplus.cn',
    path: '/gpa',
    method: 'POST',
    // port: 443,
    headers
  }
};
module.exports = api;
