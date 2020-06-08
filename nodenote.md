笔记

## 1.app.use()

app.use(path,callback) callback参数既可以是一个router对象,又可以是一个回调函数

创建子路由使用app.use(path,router)

router 一般使用

```js
const express = require('express')
const router = express.Router()
```



## 2.链接数据库

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/xxxxx',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//创建一个表结构定义
const schma = new mongoose.Schaema({
	name: {
    	type: String
  	}
})
//建立一个表的模型
const Category = mongoose.model('Category',schma)
module.exports = Category;
```

## 3.子路由的使用

```js
const express = require('express')
const router = express.Router()

//定义该路由的子路由 post/get 和 路径
router.post('/xxx',async(req,res)=>{
    
})
//app使用这个路由
app.use('/api/xxx',router)
```

## 4.跨域处理和json处理

需要引入'cors'处理跨域

使用处理json数据

```js
app.use(require('cors')())
app.use(express.json())
```



## 5.mongoDB的操作

```js
//拿到模型 模型由mongoose.model()生成
const Category = require('../../models/Category')
//创建数据
Category.create();
//查找数据
Category.findById(id);
//筛选数据
Category.find().skip(1)//跳过
Category.find().limit(1)//数量限制 配合跳过可做分页
Category.find().sort({_id:1})//按照id去排序 1正序 -1倒序
//修改数据
let one = await Category.findById(id)
one.xxx = 'xxx'
await xxx.save()
//删除数据
let one = await Category.findById(id)
await one.remove()

```

