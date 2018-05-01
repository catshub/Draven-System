const config = require('./config');

const host = config.jwcHost;
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
const API = {
  LoginAction: {
    method: 'POST',
    host,
    path: '/loginAction.do',
    headers,
  },
  XkAction: {
    method: 'POST',
    host,
    path: '/xkAction.do',
    headers,
  },
  sTop: {
    method: 'GET',
    host,
    path: '/menu/s_top.jsp',
    headers,
  },
  XkFirst: {
    method: 'GET',
    host,
    path: '/xkAction.do?actionType=-1',
    headers,
  },
  CourseAction: {
    method: 'GET',
    host,
    path: '/xkAction.do?actionType=6',
    headers,
  },
  GradeAction: {
    method: 'POST',
    host: 'g.scuplus.cn',
    path: '/gpa',
    headers
  },
  CrAction: {
    method: 'POST',
    host: 'cir.scu.edu.cn',
    path: '/cir',
    headers
  },
  BusAction: {
    method: 'GET',
    host: 'jwc.scu.edu.cn',
    path: '/scdx/skb.html',
    // headers
  },
  CalendarAction: {
    method: 'GET',
    host: 'jwc.scu.edu.cn',
    path: '/scdx/xl.html',
    // headers
  },
};
module.exports = API;
