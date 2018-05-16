const Log = require('../common/log');
const Http = require('http');
const cheerio = require('cheerio');

function formatCalendar(scuData) {
  const $ = cheerio.load(scuData);
  const table = $('table');
  // .removeAttr('class')
  // .removeAttr('style');
  const data = [];
  table.each((i, el) => {
    const key = cheerio(el)
      .prev()
      .text()
      .trim();
    const thead = `<thead><tr><th colspan="100">${key}</tr></th></thead>`;
    data.push({
      key,
      table: `<table border="1" class="table${key.substring(0, 4)}">${thead}${$(el).html()}</table>`,
    });
  });
  return data;
}

function formatAllCal(scuData) {
  const $ = cheerio.load(scuData);
  const as = $('#serach_div .list-a-content .list-b-right ul li a');
  const data = [];
  as.each((i, el) => {
    const a = cheerio(el);
    data.push({
      name: a.text(),
      href: a.attr('href'),
      key: a.text().substring(0, 4),
    });
  });
  return data;
}
function getAllCal() {
  return new Promise(reslove => {
    const scuReq = Http.request('http://jwc.scu.edu.cn/article/206/206_1.htm', response => {
      let scuData = '';
      response.on('data', d => {
        scuData += d;
      });
      response.on('end', () => {
        const res = formatAllCal(scuData);
        reslove(res);
      });
    });
    scuReq.end();
  });
}
// classroom
function calendarFunc(data = '', option, res, origin) {
  const scuReq = Http.request(data || option, response => {
    let scuData = '';
    response.on('data', d => {
      scuData += d;
    });
    response.on('end', () => {
      if (!data) {
        getAllCal().then(list => {
          res.writeHead(200, {
            'Access-Control-Allow-Origin': origin,
          });
          const now = formatCalendar(scuData);
          res.end(JSON.stringify({ list, now }));
          Log.Tip('name(): Calendar');
        });
      } else {
        res.writeHead(200, {
          'Access-Control-Allow-Origin': origin,
        });
        const now = formatCalendar(scuData);
        res.end(JSON.stringify({ now }));
        Log.Tip('name(): Calendar');
      }
    });
  });
  scuReq.end();
}

module.exports = calendarFunc;
