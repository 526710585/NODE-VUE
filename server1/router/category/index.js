module.exports = app => {
    const express = require('express')
    const router = express.Router()

    const Category = require('../../model/Category')

    router.post('/categories', async (req, res) => {
        let category = await Category.create(req.body)
        res.send('ok')
    })
    router.put('/categories/:id', async (req, res) => {
        // let category = await Category.create(req.body)
        let category = await Category.findByIdAndUpdate(req.params.id,req.body)
        // await category.save()
        res.send({result:0})
    })
    router.get('/categories', async (req, res) => {
        let category = await Category.find().populate({
            path:'parent',
            select:'name -_id'
        }).limit(10)
        res.send(category)
    })
    router.get('/categories/:id', async (req, res) => {
        let category = await Category.findById(req.params.id)
        res.send(category)
    })
    router.delete('/categories/:id', async (req, res) => {
        // let category = await Category.create(req.body)
        let category = await Category.findByIdAndRemove(req.params.id)
        // await category.save()
        res.send({result:0})
    })

    app.use('/admin/api', router)
}