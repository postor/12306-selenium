
const { By, Key, until } = require('selenium-webdriver');
const driver = require('./driver')
const findByContent = require('./find-by-content')
const wait = require('./wait')

const config = {
  from: '深圳',
  to: '广州',
  date: '24',
  ticketType: '普通',
  time: '06:00--12:00',
  trainTypes: ['GC-高铁/城际', 'D-动车'],
  fromPoints: ['深圳', '深圳北'],
  toPoints: ['广州南', '广州'],
  passagers: ['林彦君'],
  trainCodes: ['C7130', 'G1002'],
  seatTypes: ['二等座'],
}

const xPaths = {
  open: '//*[@id="show_more"]',
  query: '//*[@id="query_ticket"]',
  from: '//*[@id="fromStationText"]',
  to: '//*[@id="toStationText"]',
  date: '//*[@id="train_date"]',
  ticketType: {
    '普通': '//*[@id="sf1"]',
    '学生': '//*[@id="sf2"]',
  },
  time: '//*[@id="cc_start_time"]',
}

module.exports = async () => {

  //展开筛选
  await driver.findElement(By.xpath(xPaths.open)).click()

  //出发地
  await driver.wait(async () => {
    await driver.findElement(By.xpath(xPaths.from)).click()
    const v = await driver.findElement(By.xpath(xPaths.from)).getAttribute('value')
    return v == ''
  })
  await driver.findElement(By.xpath(xPaths.from)).sendKeys(config.from)
  await driver.findElements(By.css('#panel_cities .ralign')).then((items) => {
    const item = findByContent(items, config.from)
    console.log(item,items)
    return item.click()
  })

  //到达地
  await driver.wait(async () => {
    await driver.findElement(By.xpath(xPaths.to)).click()
    const v = await driver.findElement(By.xpath(xPaths.to)).getAttribute('value')
    console.log([v])
    return v == ''
  })
  await driver.findElement(By.xpath(xPaths.to)).sendKeys(config.to)
  await driver.findElements(By.css('#panel_cities .ralign')).then((items) => {
    const item = findByContent(items, config.to)
    return item.click()
  })

  //出发日期
  await driver.wait(async () => {
    const items = await driver.findElements(By.css('.cal-wrap .cell .so'))
    return items && items.length
  })
  await driver.findElement(By.xpath(xPaths.date)).click()
  await driver.findElements(By.css('.cal-wrap .cell .so')).then((items) => {
    const item = findByContent(items, config.date)
    return item.click()
  })

  await driver.findElement(By.xpath(xPaths.query)).click()
  await driver.findElement(By.xpath(xPaths.ticketType[config.ticketType])).click()

  //tricky
  await driver.executeScript(`$('#cc_start_time').val($('#cc_start_time').find('option:contains(${config.time})').val())`)


  config.trainTypes.forEach((x) => {
    driver.executeScript(`$('#_ul_station_train_code label:contains(${x})').click()`)
  })

  config.fromPoints.forEach((x) => {
    driver.executeScript(`$('#from_station_ul label:contains(${x})').click()`)
  })

  config.toPoints.forEach((x) => {
    driver.executeScript(`$('#to_station_ul label:contains(${x})').click()`)
  })

  return true
}

