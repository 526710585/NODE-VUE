module.exports = app => {
  const express = require('express')
  const router = express.Router()

  //拿到模型
  const Category = require('../../models/Category')

  console.log(Category);
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })
  router.get('/categories', async (req, res) => {
    res.send('hello')
  })
  app.use('/admin/api', router)
}