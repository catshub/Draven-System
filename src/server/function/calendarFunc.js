const Log = require('../common/log');
const Http = require('http');
const cheerio = require('cheerio');

function formatCalendar(scuData) {
  const $ = cheerio.load(scuData);
  const table = $('table').removeAttr('class').removeAttr('style');
  const data = [];
  table.each((i, el) => {
    data.push({
      type: cheerio(el)
        .prev()
        .text()
        .trim(),
      table: $.html(el),
    });
  });
  return data;
}

// classroom
function calendarFunc(option, res, origin) {
  const scuReq = Http.request(option, response => {
    let scuData = '';
    response.on('data', d => {
      scuData += d;
    });
    response.on('end', () => {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': origin,
      });
      res.end(JSON.stringify(formatCalendar(scuData)));
      Log.Tip('name(): Calendar');
    });
  });
  scuReq.end();
}

module.exports = calendarFunc;
