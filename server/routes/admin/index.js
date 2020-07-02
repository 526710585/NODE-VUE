module.exports = app => {
  const express = require('express')
  const router = express.Router()

  //拿到模型
  const Category = require('../../models/Category')

  console.log(Category);
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    console.log('req.body', req.body);
    res.send(model)
  })
  router.get('/categories', async (req, res) => {
    //populate 关联查询:不仅仅是要parent这个参数的id 而是要查出整个数据作为一个对象
    const model = await Category.find().populate('parent')
    res.send(model)
  })
  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })
  router.delete('/categories/:id', async (req, res) => {
    console.log(req.params.id);
    const model = await Category.findByIdAndDelete(req.params.id)
    res.send({
      result: 0
    })
  })
  router.put('/categories/:id', async (req, res) => {
    // const model = await Category.findById(req.params.id)
    // model.name = req.body.name;
    // model.parent = req.body.parent;
    // await model.save();
    const model = await Category.findByIdAndUpdate(req.params.id, req.body) //一句话代替上面的所有代码
    res.send({
      result: 0
    })
  })
  app.use('/admin/api', router)
}