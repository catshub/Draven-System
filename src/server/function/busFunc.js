const Log = require('../common/log');
const Http = require('http');
const cheerio = require('cheerio');

function formatBus(scuData) {
  const $ = cheerio.load(scuData);
  const tr = $('.MsoNormalTable tbody').find('tr');
  const data = [];
  tr.each((i, ele) => {
    const temp = {};
    cheerio(ele)
      .find('td')
      .each((j, el) => {
        temp[`busCol${j + 1}`] = cheerio(el)
          .text()
          .trim();
      });
    data[i] = temp;
  });
  const p = $('.MsoNormalTable')
    .parent()
    .next()
    .find('p');
  const tips = [];
  p.each((j, el) => {
    tips.push(cheerio(el)
      .text()
      .trim());
  });
  return { data, tips };
}

// classroom
function busFunc(option, res, origin) {
  const scuReq = Http.request(option, response => {
    let scuData = '';
    response.on('data', d => {
      scuData += d;
    });
    response.on('end', () => {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': origin,
      });
      res.end(JSON.stringify(formatBus(scuData)));
      Log.Tip('name(): Bus');
    });
  });
  scuReq.end();
}

module.exports = busFunc;
