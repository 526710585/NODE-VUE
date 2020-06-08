module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost:27017/node-vue-moba', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, err => {
    if (err) {
      console.log('链接数据库失败:', err);
    } else {
      console.log('链接数据库成功')
    }
  })
}