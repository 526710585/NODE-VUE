module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const adminModel =  require('../../models/AdminUser')
  const assert = require('http-assert')//用于处理报错
  const router = express.Router({
    mergeParams: true, //吧app.use中的params参数传递到路由中 不然拿不到路由
  })
  //登陆验证中间件
  const authMiddleware = require('../../middleware/auth')
  //获取模型的中间件
  const getModelMiddleware = require('../../middleware/getModel')


  //拿到模型
  // const Category = require('../../models/Category')

  //创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    console.log('req.body', req.body);
    res.send(model)
  })
  //资源列表
  router.get('/', async (req, res) => {
    const ModelName = req.Model.modelName;
    const queryOptions = {}
    if (ModelName === 'Category') { //匹配只有查询Category模型时 才填充parent选项
      queryOptions.populate = 'parent'
    }else if (ModelName === 'Hero'){
      // queryOptions.populate = 'categories'
    }else if(ModelName === 'Article'){
      queryOptions.populate = 'categories'
    }
    //populate 关联查询:不仅仅是要parent这个参数的id 而是要查出整个数据作为一个对象
    const model = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(model)
  })
  //资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  //删除资源
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      result: 0
    })
  })
  //更新资源
  router.put('/:id', async (req, res) => {
    // const model = await req.Model.findById(req.params.id)
    // model.name = req.body.name;
    // model.parent = req.body.parent;
    // await model.save();
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body) //一句话代替上面的所有代码
    res.send({
      result: 0
    })
  })


  //app 使用路由
  app.use('/admin/api/rest/:resource',authMiddleware(), getModelMiddleware(), router)

  //文件上传
  const multer = require('multer')//引入处理上传文件的插件
  const upload = multer({dest:__dirname+'/../../uploads'})//这个中间件使用multer处理 上传后的路径
  app.use('/admin/api/upload',authMiddleware(),upload.single('file')/**single 代表单文件 */,async (req,res)=>{
    const file = req.file
    file.url = `http://localhost:3001/uploads/${file.filename}`
    res.send(file)
  })

  //登陆
  app.post('/admin/api/login',async (req,res)=>{
    // res.send({msg:'ok'})
    //1.查找用户名  
    const {userName,passWord} = req.body
    if(!userName||!passWord){
      return res.status(422).send({
        msg:'用户名或密码为空'
      })
    }
    var user = await adminModel.findOne({userName}).select('+passWord')//select取出默认不取出的数据
    assert(user,422,'用户不存在')
    //2.校验密码
    const bcrypt = require('bcrypt')
    const isValid = bcrypt.compareSync(passWord,user.passWord)//对比散列的密码
    assert(isValid,422,'用户名或密码错误')
    //3.返回token
    const token = jwt.sign({id:user._id},app.get('secret'))//获取设定的配置参数
    res.send({token})
  })
  
  //错误处理的函数 利用httpassert抛出错误 这里统一返回
  app.use((err,req,res,next)=>{
    //1.err.statusCode 由assert抛出 2.其他服务异常
    res.status(err.statusCode||500).send({
      msg:err.message
    })
  })

}