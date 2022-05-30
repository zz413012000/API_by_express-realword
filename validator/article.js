const validate=require('../middleware/validate')
const {body,param}=require('express-validator')
// const mongoose=require('mongoose')
const {Article}=require("../model/index")

exports.createArticle=validate([
    body('article.title').notEmpty().withMessage('Titile is required.'),
    body('article.description').notEmpty().withMessage('Description is required.'),
    body('article.body').notEmpty().withMessage('Body is required.')
])

exports.getArticle=validate([
    validate.isValidObjectId(["params"],"articleId")
    // param('articleId').custom(async value=>{
    //     if(!mongoose.isValidObjectId(value)){
    //         return Promise.reject('文章 ID 類型錯誤')
    //         // 同步失敗
    //         // throw new Error('文章 ID 類型錯誤')
    //     }
    //     // // 同步成功
    //     // return true
    // })
])

exports.updateArticle=[
    // 用 mongoose.isValidObjectId檢驗是不是有效 ID
    validate([
        validate.isValidObjectId(["params"],"articleId")
    ]),
    // 檢查是不是正確的文章 ID
    async(req,res,next)=>{
        const articleId=req.params.articleId
        console.log("articleId",articleId)
        const article=await Article.findById(articleId)
        console.log("article",article)
        req.article=article
        if(!article){
            // 404 錯誤，伺服器無法正確提供訊息
            return res.status(404).end()
        }
        next()
    },
    async(req,res,next)=>{
        // req.user._id 是一個物件
        // req.article.author 是一個字串
        if(req.user._id.toString() !== req.article.author.toString()){
            // 403 錯誤，伺服器正確解析請求，但客戶端沒有存取該資源的權限。
            return res.status(403).end()
        }
        next()
    }
]
// 檢驗文章是否存在
// 修改的文章作者是否次當前用戶
exports.deleteArticle=exports.updateArticle