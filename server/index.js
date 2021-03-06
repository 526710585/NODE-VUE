const express = require('express')

const app = express()

app.set('secret','dd87vhkjbd21dsa89')

//跨域
app.use(require('cors')())
//解析json数据
app.use(express.json())
//静态文件的处理
app.use('/uploads',express.static(__dirname+'/uploads'))


//直接引入了路由中的函数，并且调用它，并且传入app
require('./routes/admin/index')(app)
//链接数据库
require('./plugins/db')(app)

app.listen(3001, () => {
  console.log('http://localhost:3001');
})