const mongoose=require('mongoose')
const baseModel=require('./base-model')
const Schema=mongoose.Schema
const articleSchema=mongoose.Schema({
    ...baseModel,
    "title": {
        type:String,
        required:true // mongoose 提供的驗證
    },
    "description":{
        type:String,
        required:true
    } ,
    "body":{
        type:String,
        required:true
    },
    "tagList":{ //個人介紹
        type:[String],
        default:null
    },
    "favoritesCout":{
        type:Number,
        default:0
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})
module.exports=articleSchema