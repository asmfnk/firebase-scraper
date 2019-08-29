const scraper = require('./scraper');
const scraperTest = require('./scraper-test');
const functions = require('firebase-functions');

exports.scraper = scraper;

exports.scraperHttp = functions.https.onRequest((request, response) => {
  return scraperTest(request,response)
});
