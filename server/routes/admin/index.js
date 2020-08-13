module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true, //吧app.use中的params参数传递到路由中 不然拿不到路由
  })

  const inflection = require('inflection'); //用来转换类名的插件  吧小写的接口转换为model的大写名称

  //拿到模型
  // const Category = require('../../models/Category')


  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    console.log('req.body', req.body);
    res.send(model)
  })

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

  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      result: 0
    })
  })

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

  app.use('/admin/api/rest/:resource', (req, res, next) => {
    const modelName = inflection.classify(req.params.resource) //使用inflection转换名称
    console.log(`../../models/${modelName}`);
    const Model = require(`../../models/${modelName}`)
    console.log('Model',Model);
    req.Model = Model;
    next();
  }, router)

  const multer = require('multer')//引入处理上传文件的插件
  const upload = multer({dest:__dirname+'/../../uploads'})//这个中间件使用multer处理 上传后的路径
  app.use('/admin/api/upload',upload.single('file')/**single 代表单文件 */,async (req,res)=>{
    const file = req.file
    file.url = `http://localhost:3001/uploads/${file.filename}`
    res.send(file)
  })
}