const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  const INIT_URL = 'https://yahoo.co.jp';

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 1024 });

  // URLに移動
  await page.goto(INIT_URL, { waitUntil: 'domcontentloaded', timeout: 20000 });

  const scrapingData = await page.evaluate(() => {// この中のconsole.logは表示されない

    // ページ全体を取得する場合はこちら
    // const all = document.querySelector('#').innerHTML;
    // return all;

    const dataList = [];
    const nodeList = document.querySelectorAll("#topicsboxbd .emphasis li");
    nodeList.forEach(_node => {
      dataList.push(_node.innerText);
    });
    return dataList;
  });

  console.log(scrapingData);
  res.status(200).send(scrapingData)
};
