module.exports = options =>{
  const inflection = require('inflection'); //用来转换类名的插件  吧小写的接口转换为model的大写名称

  return (req, res, next) => {
    const modelName = inflection.classify(req.params.resource) //使用inflection转换名称
    const Model = require(`../models/${modelName}`)
    console.log('Model',Model);
    req.Model = Model;
    next();
  }
}