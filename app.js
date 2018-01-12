const fs = require('fs')
const { Builder, By, Key, until } = require('selenium-webdriver');
const fillConfig = require('./fill-config')
const driver = require('./driver')


//打开登录界面，需要手动登录
driver.get('https://kyfw.12306.cn/otn/login/init')
driver.wait(until.titleIs("我的12306 | 客运服务 | 铁路客户服务中心"), 30 * 60 * 1000)

//打开订票页面
driver.get('https://kyfw.12306.cn/otn/leftTicket/init')

//自动填入信息
fillConfig()

driver.wait(until.titleIs("aaa"), 30 * 60 * 1000)

driver.quit();
