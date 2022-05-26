const {verify}=require('../util/jwt')
const {jwtSecret}=require('../config/config.default')
const {User}=require('../model')
module.exports=async(req,res,next)=>{
    // 從請求頭獲取 token 數據
    let token=req.headers.authorization
    token= token ? token.split('Bearer ')[1]:null
    if(!token){
        return res.status(401).end()
    }
    try{
        const decodedToken=await verify(token,jwtSecret)
        console.log("decodedToken",decodedToken)
        req.user=await User.findById(decodedToken.userId)
        next()
    }catch(err){
        return res.status(401).end()
    }
    // 驗證 token 是否有效
    // 無效 - 401
    // 有效 -> 將用戶信息讀取出來用掛載到 req 物件上面，繼續往後執行

}