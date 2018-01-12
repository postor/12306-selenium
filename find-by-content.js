
const driver = require('./driver')

module.exports = (items,text)=>{
  const item = items.find((x)=>{
    return x.getText() == text
  })

  return item
}