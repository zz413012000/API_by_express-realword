const express=require('express')
const articleCtrl=require('../controller/article')
const auth=require('../middleware/auth')
const articleValidator=require('../validator/article')

const router=express.Router()

// // 獲取文章列表
router.get('/',articleCtrl.getArticles)
// // 獲取用戶關注的作者文章列表
// router.get('/feed',articleCtrl.getFeedArticles)
// // 獲取文章
router.get('/:articleId',articleValidator.getArticle,articleCtrl.getArticle)
// // 創建文章
router.post('/',auth,articleValidator.createArticle,articleCtrl.createArticle)
// // 更新文章
router.put('/:articleId',auth,articleValidator.updateArticle,articleCtrl.updateArticle)
// // 刪除文章
router.delete('/:articleId',auth,articleValidator.deleteArticle,articleCtrl.deleteArticle)
// // 添加文章評論
// router.post('/:slug/comments',articleCtrl.createArticleComment)
// // 獲取文章評論列表
// router.get('/:slug/comments',articleCtrl.getArticleComments)

module.exports=router