const {Article, User}=require('../model')
exports.createArticle=async(req,res,next)=>{
    try{
        const article=new Article(req.body.article);
        article.author=req.user._id
        article.populate('author') // 利用 Schema.Types.ObjectId 映射到 User 集合中的資料
        await article.save()
        res.status(201).json({
            article
        })
    }catch(err){
        next(err)
    }
}
// 獲取文章列表
exports.getArticles= async(req,res,next)=>{
    try{
        const {
            limit=20,
            offset=0,
            tag,
            author
        }=req.query
        const filter={}
        if(tag){
            filter.tagList=tag
        }
        if(author){
            const user=await User.findOne({username:author}) // 利用作者名取得，資料庫中指定的 document 
            filter.author=user? user._id :null
        }
        console.log(filter)
        const articleCount=await Article.countDocuments()
        const articles=await Article.find(filter)
            .skip(Number.parseInt(offset)) // 跳過多少條
            .limit(Number.parseInt(limit)) // 取多少條
            .sort({// 排序
                // -1 倒敘 , 1 升序
                createAt:1
            }) 
            .populate('author')
        res.status(200).json({
            articles,
            articleCount
        })
    }catch(err){
        next(err)
    }
}
// 獲取文章
exports.getArticle=async(req,res,next)=>{
    try{
        const article=await Article.findById(req.params.articleId).populate('author')
        console.log(article)
        if(!article){
            return res.status(404).end()
        }
        res.status(200).json({
            article
        })
    }catch(err){
        next(err)
    }
}
// 更新文章
exports.updateArticle=async(req,res,next)=>{
    try{
        const article=req.article // validator 的 Article.findById() 找到原本在 DB 的 article 已經放進了 req.article
        const bodyArticle=req.body.article // 新 put 上來的 article
        article.title=bodyArticle.title || article.title // 如果 put 上來 req.body 有新的 title，就替換上去
        article.description=bodyArticle.description || article.description
        article.body=bodyArticle.body || article.body
        await article.save() // article 是 Mongo 物件
        // res.send("updateArticle")
        res.status(200).json({
            article
        })
    }catch(err){
        next(err)
    }
}
// 刪除文章
exports.deleteArticle=async(req,res,next)=>{
    try{
        const article=req.article
        await article.remove()
        res.status(204).end()
        // res.send("deleteArticle")
    }
    catch(err){
        next(err)
    }
}