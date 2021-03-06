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



## 8.CRUD接口

通用的CRUD接口,是为了满足只修改Model情况下 其余都相同的增删改查接口,我们利用inflection插件转换大小写,根据接口请求的参数不同,去不同的model中 操作(增删改查)数据

1.利用app.use匹配一个params可修改的路径(:resource)

```js
  app.use('/admin/api/rest/:resource', router)
```

2.并且在引入Router中设置 mergeParams: true 的选项 ,方便吧app.use中匹配的params参数传递到路由中

```js
  const router = express.Router({
    mergeParams: true, //吧app.use中的params参数传递到路由中 不然拿不到路由
  })
```

3.在app.use中添加中间件,根据请求参数去获取不同的Model名称,然后挂载到req中

```js
  app.use('/admin/api/rest/:resource', (req, res, next) => {
    const modelName = inflection.classify(req.params.resource) //使用inflection转换名称
    const Model = require(`../../models/${modelName}`)
    req.Model = Model;
    next();
  }, router)
```

4.在路由中使用req.Model去查询(增删改查)参数



## 9.密码的保存

1.Schaema中使用set修改数据库储存的密码

2.安装bcrypt散列密码储存

3.select:false 默认不让查出

```js
const schema = new mongoose.Schema({
  userName:{
    type:String
  },
  passWord:{
    type:String,
    select:false,
    set(val){
      return bcrypt.hashSync(val,10)
    }
  }
})
```



## 10.密码的效验以及token

1.bcrypt 用于散列密码

```js
bcrypt.hashSync(val,10) //散列密码
bcrypt.compareSync(val,hashVal) //对比密码
```

2.jwt用于生成token(jsonwebtoken)

```js
const token = jwt.sign(obj,secret)//使用 数据 和 secret 生成token
const obj = jwt.verify(token,secret)//使用token 和 secret 生成数据

secret应该存到环境变量
```



## 11.http-assert 用于断言抛出错误  app.use 四个参数用于接受全局的错误

```js
assert(data,402,message)//判断data是否为真 抛出402的错误 带上msg

app.use(err,req,res,next){
    //返回错误信息
	res.status(err.statusCode||500).send({msg:err.message})
}
```

