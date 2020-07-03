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



## 6.数据库结构定义

定义 mongoose.SchemaTypes.ObjectId 代表type为mongooDB中_id的数据类型

ref 代表填充的时候 ,mongoose应该使用哪个model(模型) 

```js
const schema = new mongoose.Schema({
    name:String,
    parent:{
        //
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Category'
    }
})
```



## 7.populate的作用

填充查询 : 在一个文档中引用另一个集合中的文档,并将其填充到指定文档路径

填入要填充(替换)的属性,需要配合结构定义中的type属性和ref属性去做



1.字段选择

如果只想要填充的文档的某些字段 可以使用

```js
populate('parent','name')//在填充parent时,仅返回name字段
```

2.填充多个路径

```js
let category = await 
Category.find().
populate('parent').
populate('child')
```

3.查询条件 

替换parant属性,要求age为21以上,只返回name属性,并且数量小于5

```js
let category = await 
Category.find().
populate({
	path:'parent',
	match: {age:{$gte:21}},
	select:'name -_id',//select属性 -_id选项就不会附带_id
	options:{limit:5}
})
```

