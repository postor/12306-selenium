
const driver = require('./driver')

module.exports = async (miliseconds) => {
  let t = false
  setTimeout(() => {
    t = true
  })
  await driver.wait(() => t)
}