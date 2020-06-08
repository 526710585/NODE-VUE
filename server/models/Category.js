const mongoose = require('mongoose')
//表结构的定义
const schma = new mongoose.Schema({
  name: {
    type: String
  }
})
//定义表
module.exports = mongoose.model('Category', schma)