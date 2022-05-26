const express=require('express')
const router=express.Router()
// user 相關 router
router.use(require('./user'))
// user data 相關 router
router.use('/profile',require('./profile'))
// article 相關 router
router.use('/articles',require('./article'))
// tag 相關 router
// router.use('/tags',require('./tag'))
module.exports=router