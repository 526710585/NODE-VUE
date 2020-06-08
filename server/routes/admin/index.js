module.exports = app => {
  const express = require('express')
  const router = express.Router()

  //拿到模型
  const Category = require('../../models/Category')()

  console.log(Category);
  router.post('/categories', async (req, res) => {
    const model = await Category.created(req.body)
    res.send(model)
  })
  app.use('/admin/api', router)
}