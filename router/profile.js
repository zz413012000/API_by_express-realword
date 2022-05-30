const express=require('express')
const router=express.Router()
// user login
router.post('/:username',async(req,res,next)=>{
    try{
        res.send('post /:username')
    }catch(err){
        next(err)
    }
})
// 關注 user
router.post('/:username/follow',async(req,res,next)=>{
    try{
        res.send('post /:username/follow')
    }catch(err){
        next(err)
    }
})
// 取消關注
router.delete('/:username/follow',async(req,res,next)=>{
    try{
        res.send('post /:username/follow')
    }catch(err){
        next(err)
    }
})
module.exports=router