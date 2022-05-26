const validate=require('../middleware/validate')
const {body,param}=require('express-validator')
const mongoose=require('mongoose')

exports.createArticle=validate([
    body('article.title').notEmpty().withMessage('Titile is required.'),
    body('article.description').notEmpty().withMessage('Description is required.'),
    body('article.body').notEmpty().withMessage('Body is required.')
])

exports.getArticle=validate([
    param('articleId').custom(async value=>{
        if(!mongoose.isValidObjectId(value)){
            return Promise.reject('文章 ID 類型錯誤')
            // 同步失敗
            // throw new Error('文章 ID 類型錯誤')
        }
        // // 同步成功
        // return true
    })
])