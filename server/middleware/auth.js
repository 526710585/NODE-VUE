module.exports = options=>{
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')//用于处理报错
  const adminModel =  require('../models/AdminUser')

  return async (req,res,next)=>{
    const token = String(req.headers.authorization||'').split(' ').pop()
    assert(token,401,'请先登陆')//无token
    console.log(token);
    const data = jwt.verify(token, req.app.get('secret'))
    assert(data,401,'请先登陆')//token无效
    const user = await adminModel.findById(data.id)
    assert(data,401,'请先登陆')//数据库无数据
    req.user = user;//挂载到req
    await next()
  }
}