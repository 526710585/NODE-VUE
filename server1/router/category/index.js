module.exports = app => {
    const express = require('express')
    const router = express.Router()

    const Category = require('../../model/Category')

    router.post('/categories', async (req, res) => {
        console.log(11111111)
        let category = await Category.create(req.body)
        res.send('ok')
    })
    router.get('/categories', async (req, res) => {
        let category = await Category.find()
        res.send(category)
    })

    // router.get('/categories', async (req, res) => {
    //     console.log('get')
    //     res.send('ok')
    // })

    app.use('/admin/api', router)
}