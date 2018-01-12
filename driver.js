
const { Builder, By, Key, until } = require('selenium-webdriver');

let driver = new Builder()
  .forBrowser('firefox')
  .build();

module.exports = driver