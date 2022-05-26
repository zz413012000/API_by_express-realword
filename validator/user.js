const validate=require('../middleware/validate')
const {body}=require('express-validator')
const { User } = require('../model');
const md5=require("../util/md5.js") // 加密算法

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
exports.login=[
    validate([// 整體是異步驗證
        body('user.email').notEmpty().withMessage('The email is required'),
        body('user.password').notEmpty().withMessage('password is required')
    ]),
    validate([
        body('user.email').custom(async (email,{req} )=>{
            const user=await User.findOne({email})
                .select(['email','username','bio','image','password'])
            // password 在 model 被設置成 select false 所以這裡需要將 password 帶出
            if(!user){
                return Promise.reject('User not found.')
            }
            // 將查到的 user 放進 req object，這樣後續的 middleware 也可以使用
            req.user=user
            // req.user 裡面放的是 DB 的 user
        })
    ]),
    validate([
        body('user.password').custom(async (password,{req})=>{
            //  login 輸入的 password 不等於 DB 的 password
            console.log(md5(password))
            console.log("DB req password",req.user.password)
            console.log("DB req",req.user)
            if(md5(password) !== req.user.password){
                return Promise.reject('password error')
            }
        })
    ])
]