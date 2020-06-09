const express = require('express')

const app = express()

app.use(require('cors')())
app.use(express.json())

require('./router/category/index')(app)
require('./plugins/db')(app)


app.listen(3001,()=>{
    console.log('3001');
})