const express=require('express')
const router=express.Router()
const userCtrl=require('../controller/user');
const userValidator=require('../validator/user')
const auth=require('../middleware/auth')

// user login
router.post('/users/login',userValidator.login,userCtrl.login)
// user registration
// 使用 validator 的 body() 來驗證 req.body
router.post('/users',userValidator.register,userCtrl.register)
// 獲取當前登陸用戶
router.get('/user',auth,userCtrl.getCurrentUser)
// update current user
router.put('/user',auth,userCtrl.updateCurrentUser)
module.exports=router