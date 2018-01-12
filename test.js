const { Builder, By, Key, until } = require('selenium-webdriver');


let driver = new Builder()
  .forBrowser('firefox')
  .build();

//打开登录界面，需要手动登录
driver.get('https://www.baidu.com')

driver.findElement(By.xpath('//*[@id="kw"]')).sendKeys('哈哈哈')
driver.findElement(By.xpath('//*[@id="su"]')).click()


driver.wait(until.titleIs("我的12306 | 客运服务 | 铁路客户服务中心"), 30 * 60 * 1000)
driver.quit();