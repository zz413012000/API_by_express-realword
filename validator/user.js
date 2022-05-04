const validate=require('../middleware/validate')
const {body}=require('express-validator')
const { User } = require('../model');

exports.register=validate([
    // 1. 配置驗證規則
    body('user.username').notEmpty().withMessage('The username is required.').bail()
    .custom(async username=>{
        console.log(username)
        const user=await User.findOne({username})
        if(user){
            return Promise.reject('username already existed')
        }
    }),
    body("user.password").notEmpty().withMessage('The password is required.'),
    body('user.email').notEmpty().withMessage('The email is required.').bail()
    .custom(async email=>{
        const user=await User.findOne({email})
        if(user){
            return Promise.reject('email already existed.')
        }
    })
])