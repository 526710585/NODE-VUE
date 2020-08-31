const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const schema = new mongoose.Schema({
  userName:{
    type:String
  },
  passWord:{
    type:String,
    select:false,//默认查询不给出
    set(val){
      return bcrypt.hashSync(val,10)
    }//密码散列
  }
})

module.exports = mongoose.model('AdminUser',schema)