const util=require('util')
module.exports=()=>{
    return (err,req,res,next)=>{        
        // console.log(err)
        res.status(500).json({
            error:util.format(err) // 將 err 轉成字串格式回傳
        })
    }
}