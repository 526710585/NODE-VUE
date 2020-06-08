const express = require('express')

const app = express()

//跨域
app.use(require('cors')())
//解析json数据
app.use(express.json())


//直接引入了路由中的函数，并且调用它，并且传入app
require('./routes/admin/index')(app)
//链接数据库
require('./plugins/db')(app)

app.listen(3001, () => {
  console.log('http://localhost:3001');
})