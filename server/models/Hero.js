const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{
        type:String
    },
    title:{
        type:String
    },
    //可以存在多个分类
    categories:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Category'
    }],
    icon:{
        type:String
    },
    //定义了一个复杂类型
    scores:{
        difficulty:{
            type:Number
        },
        skill:{
            type:Number
        },
        attack:{
            type:Number
        },
        existence:{
            type:Number
        }
    },
    skills:[{
        icon:{
            type:String
        },
        name:{
            type:String
        },
        description:{
            type:String
        }
    }],
    equipment:{
        winning:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
        losing:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    },
    usageTips:{
        type:String
    },
    competeTips:{
        type:String
    },
    teamFightTips:{
        type:String
    },
    heroRelation:{
        partner: [{
            hero: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Hero'
            },
            description: {
                type: String
            }
        }],
        restrained: [{
            hero: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Hero'
            },
            description: {
                type: String
            }
        }],
        restrain: [{
            hero: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Hero'
            },
            description: {
                type: String
            }
        }],
    }

})

module.exports = mongoose.model('Hero',schema)