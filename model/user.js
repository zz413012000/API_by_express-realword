const mongoose=require('mongoose')
const baseModel=require('./base-model')
const md5 =require('../util/md5')
const userSchema =new mongoose.Schema({
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
        required:true,
        set: value => md5(value),
        select:false // 預設不從資料庫獲取 password
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

module.exports=userSchema