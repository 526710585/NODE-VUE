const mongoose = require('mongoose')
//表结构的定义
const schma = new mongoose.Schema({
  name: {
    type: String,
  },
  parent: {
    //这个属性的type: Onjectid代表mongooDB数据库中的id 是一个特殊类型
    type: mongoose.SchemaTypes.ObjectId,
    //这个属性 关联的哪一个模型 
    ref: 'Category'
  }
})
//定义表
module.exports = mongoose.model('Category', schma)