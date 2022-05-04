const mongoose=require('mongoose')
const baseModel=require('./base-model')
const articleSchema=mongoose.Schema({
    ...baseModel,
    "username": {
        type:String,
        required:true // mongoose 提供的驗證
    },
    "email":{
        type:String,
        required:true
    } ,
    "password":{
        type:String,
        required:true
    },
    "bio":{ //個人介紹
        type:String,
        default:null
    },
    "img":{
        type:String,
        default:null
    }
})
module.exports=articleSchema