const mongoose = require('mongoose');

const Schma = new mongoose.Schema({
  name:{
    type:String
  },
  icon:{
    type:String
  }
})

module.exports = mongoose.model('Item',Schma)