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
      // res.end(JSON.stringify(fake));
      Log.Tip('name(): Course');
    });
  });
  scuReq.setHeader('Cookie', cookie);
  scuReq.end();
}
const fake = [
  {
    program: '计算机科学与技术（卓越工程师）培养方案',
    kch: '107122020',
    course_name: '形势与政策-1',
    kxh: '23',
    credit: '2.0',
    course_type: ['1', '3'],
    test_type: '考试',
    teacher: '叶庆*',
    study_type: '正常',
    choose_type: '置入',
    week_type: '双周',
    week: '1',
    campus: '江安',
    build: '综合楼C座',
    classroom: 'C207',
  },
  {
    program: '计算机科学与技术（卓越工程师）培养方案',
    kch: '107122020',
    course_name: '形势与政策-2',
    kxh: '23',
    credit: '2.0',
    course_type: ['4', '7'],
    test_type: '考试',
    teacher: '叶庆*',
    study_type: '正常',
    choose_type: '置入',
    week_type: '双周',
    week: '1',
    campus: '江安',
    build: '综合楼C座',
    classroom: 'C207',
  },
  {
    program: '计算机科学与技术（卓越工程师）培养方案',
    kch: '107122020',
    course_name: '形势与政策-3',
    kxh: '23',
    credit: '2.0',
    course_type: ['8', '9'],
    test_type: '考试',
    teacher: '叶庆*',
    study_type: '正常',
    choose_type: '置入',
    week_type: '双周',
    week: '1',
    campus: '江安',
    build: '综合楼C座',
    classroom: 'C207',
  },
  {
    program: '计算机科学与技术（卓越工程师）培养方案',
    kch: '107122020',
    course_name: '形势与政策-4',
    kxh: '23',
    credit: '2.0',
    course_type: ['10', '13'],
    test_type: '考试',
    teacher: '叶庆*',
    study_type: '正常',
    choose_type: '置入',
    week_type: '双周',
    week: '1',
    campus: '江安',
    build: '综合楼C座',
    classroom: 'C207',
  },
  {
    program: '计算机科学与技术（卓越工程师）培养方案',
    kch: '107122020',
    course_name: '形势与政策-5',
    kxh: '23',
    credit: '2.0',
    course_type: ['1', '2'],
    test_type: '考试',
    teacher: '叶庆*',
    study_type: '正常',
    choose_type: '置入',
    week_type: '双周',
    week: '2',
    campus: '江安',
    build: '综合楼C座',
    classroom: 'C207',
  },
  {
    program: '计算机科学与技术（卓越工程师）培养方案',
    kch: '107122020',
    course_name: '形势与政策-6',
    kxh: '23',
    credit: '2.0',
    course_type: ['5', '7'],
    test_type: '考试',
    teacher: '叶庆*',
    study_type: '正常',
    choose_type: '置入',
    week_type: '双周',
    week: '2',
    campus: '江安',
    build: '综合楼C座',
    classroom: 'C207',
  },
  {
    program: '计算机科学与技术（卓越工程师）培养方案',
    kch: '107122020',
    course_name: '形势与政策-7',
    kxh: '23',
    credit: '2.0',
    course_type: ['7', '11'],
    test_type: '考试',
    teacher: '叶庆*',
    study_type: '正常',
    choose_type: '置入',
    week_type: '双周',
    week: '3',
    campus: '江安',
    build: '综合楼C座',
    classroom: 'C207',
  },
  {
    program: '计算机科学与技术（卓越工程师）培养方案',
    kch: '107122020',
    course_name: '形势与政策-8',
    kxh: '23',
    credit: '2.0',
    course_type: ['12', '13'],
    test_type: '考试',
    teacher: '叶庆*',
    study_type: '正常',
    choose_type: '置入',
    week_type: '双周',
    week: '3',
    campus: '江安',
    build: '综合楼C座',
    classroom: 'C207',
  },
  {
    program: '计算机科学与技术（卓越工程师）培养方案',
    kch: '107122020',
    course_name: '形势与政策-9',
    kxh: '23',
    credit: '2.0',
    course_type: ['1', '12'],
    test_type: '考试',
    teacher: '叶庆*',
    study_type: '正常',
    choose_type: '置入',
    week_type: '双周',
    week: '4',
    campus: '江安',
    build: '综合楼C座',
    classroom: 'C207',
  },
  {
    program: '计算机科学与技术（卓越工程师）培养方案',
    kch: '107122020',
    course_name: '形势与政策-10',
    kxh: '23',
    credit: '2.0',
    course_type: ['2', '12'],
    test_type: '考试',
    teacher: '叶庆*',
    study_type: '正常',
    choose_type: '置入',
    week_type: '双周',
    week: '5',
    campus: '江安',
    build: '综合楼C座',
    classroom: 'C207',
  },
  {
    program: '计算机科学与技术（卓越工程师）培养方案',
    kch: '107122020',
    course_name: '形势与政策-11',
    kxh: '23',
    credit: '2.0',
    course_type: ['1', '2'],
    test_type: '考试',
    teacher: '叶庆*',
    study_type: '正常',
    choose_type: '置入',
    week_type: '双周',
    week: '6',
    campus: '江安',
    build: '综合楼C座',
    classroom: 'C207',
  },
  {
    program: '计算机科学与技术（卓越工程师）培养方案',
    kch: '107122020',
    course_name: '形势与政策-12',
    kxh: '23',
    credit: '2.0',
    course_type: ['7', '9'],
    test_type: '考试',
    teacher: '叶庆*',
    study_type: '正常',
    choose_type: '置入',
    week_type: '双周',
    week: '6',
    campus: '江安',
    build: '综合楼C座',
    classroom: 'C207',
  },
  {
    program: '计算机科学与技术（卓越工程师）培养方案',
    kch: '107122020',
    course_name: '形势与政策-13',
    kxh: '23',
    credit: '2.0',
    course_type: ['2', '4'],
    test_type: '考试',
    teacher: '叶庆*',
    study_type: '正常',
    choose_type: '置入',
    week_type: '双周',
    week: '7',
    campus: '江安',
    build: '综合楼C座',
    classroom: 'C207',
  },
  {
    program: '计算机科学与技术（卓越工程师）培养方案',
    kch: '107122020',
    course_name: '形势与政策-14',
    kxh: '23',
    credit: '2.0',
    course_type: ['10', '11'],
    test_type: '考试',
    teacher: '叶庆*',
    study_type: '正常',
    choose_type: '置入',
    week_type: '双周',
    week: '7',
    campus: '江安',
    build: '综合楼C座',
    classroom: 'C207',
  },
];
module.exports = courseFunc;
