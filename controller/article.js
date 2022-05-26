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
            console.log("user:",user)
            filter.author=user? user._id :null
        }
        console.log(filter)
        const articleCount=await Article.countDocuments()
        const articles=await Article.find(filter)
            .skip(Number.parseInt(offset)) // 跳過多少條
            .limit(Number.parseInt(limit)) // 取多少條
            .sort({// 排序
                // -1 倒敘 , 1 升序
                createdAt:-1
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