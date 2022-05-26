const {User}=require("../model") // 引入 model/index.js
const jwt  =require('../util/jwt')
const {jwtSecret}=require('../config/config.default.js')
// user login
exports.login=async(req,res,next)=>{ 
    try{
        // 1. get data
        // 2. verify data
        const user=req.user.toJSON()
        const token= await jwt.sign({
            userId:user._id
        },jwtSecret,{
            expiresIn: 60*60
        })
        // 3. send response
        delete user.password
        res.status(200).json({
            ...user,token
        })
    }catch(err){
        next(err)
    }
}
// user registration
exports.register=async(req,res,next)=>{
    try{
        // 1. get data
        console.log(req.body)
        // 2. verify data
        // 2.1 basic data verification
        // 2.2 business data verification
        // 3. 驗證通過，save data in DB
        let user=new User(req.body.user)
        // 保存到 DB
        await user.save()

        user=user.toJSON() // 將 mongoose 轉成普通的數據物件
        delete user.password
        
        // 4. send response
        res.status(201).json({
            user
        })
    }catch(err){
        next(err)
    }
}
// get current user
exports.getCurrentUser=(req,res,next)=>{ 
    try{
        res.status(200).json({
            user:req.user
        })
    }catch(err){
        next(err)
    }
}
// update current user
exports.updateCurrentUser=(req,res,next)=>{ 
    try{
        res.send('put /user')
    }catch(err){
        next(err)
    }
}