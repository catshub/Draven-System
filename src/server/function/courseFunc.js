const Log = require('../common/log');
const Http = require('http');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');

function formatCourse(html) {
  const $ = cheerio.load(html);
  const type = $('#user thead th')
    .text()
    .trim()
    .split(/\s+/);
  const typeEN = [
    'program',
    'kch',
    'course_name',
    'kxh',
    'credit',
    'course_type',
    'test_type',
    'teacher',
    'calendar',
    'study_type',
    'choose_type',
    'week_type',
    'week',
    'course_type',
    'campus',
    'build',
    'classroom',
  ];
  const dataTR = $('#user thead')
    .next()
    .find('tr');
  const data = [];
  dataTR.each((i, ele) => {
    const temp = {};
    cheerio(ele)
      .find('td')
      .each((j, el) => {
        temp[typeEN[j]] = cheerio(el)
          .text()
          .trim();
      });
    temp.course_type = !temp.course_type ? [] : temp.course_type.split('~');
    delete temp.calendar;
    data[i] = temp;
  });
  return data;
}

function courseFunc(cookie, option, res, origin) {
  const scuReq = Http.request(option, response => {
    let scuData = '';
    response.on('data', d => {
      scuData += iconv.decode(d, 'gbk');
    });
    response.on('end', () => {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
      });
      res.end(JSON.stringify(formatCourse(scuData)));
      Log.Tip('name(): Course');
    });
  });
  scuReq.setHeader('Cookie', cookie);
  scuReq.end();
}
module.exports = courseFunc;
