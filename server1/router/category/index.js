const { send } = require('process')

module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams:true
    })


    const inflection = require('inflection')
    const multer = require('multer')

    router.post('/', async (req, res) => {
        let model = await req.Model.create(req.body)
        res.send('ok')
    })
    router.put('/:id', async (req, res) => {
        // let model = await  req.Model.create(req.body)
        let model = await  req.Model.findByIdAndUpdate(req.params.id,req.body)
        // await model.save()
        res.send({result:0})
    })
    router.get('/', async (req, res) => {
        const modelName = req.Model.modelName;
        const optionObject = {}
        
        if(modelName=='Category'){
            optionObject.populate = {
                path: 'parent',
                select: 'name -_id'
            }
        }
        let model = await  req.Model.find().setOptions(optionObject).limit(10)

        res.send(model)
    })
    router.get('/:id', async (req, res) => {
        let model = await  req.Model.findById(req.params.id)
        res.send(model)
    })
    router.delete('/:id', async (req, res) => {
        // let model = await  req.Model.create(req.body)
        // await model.save()
        let model = await  req.Model.findByIdAndRemove(req.params.id)
        res.send({result:0})
    })

    app.use('/admin/api/rest/:name',(req,res,next)=>{
        const modelName = inflection.classify(req.params.name)
        req.Model = require(`../../model/${modelName}`)        //module 模块 组件  model 模型
        next()
    }, router)

    const upload = multer({dest:`${__dirname}/../../uploads`})

    app.use('/admin/api/upload',upload.single('file'),(req,res)=>{
        const url = `http://localhost:3001/uploads/${req.file.filename}`
        res.send({result:0,url})
    })
}