const express=require('express')
const app=express()
const morgan=require('morgan') // 日誌
const cors=require('cors')
const router=require("./router")
const errorHandler=require('./middleware/error-handler') // 錯誤處理
require('dotenv').config(); // 引入環境變量

require('./model/index') // 連線 DB

const PORT=process.env.PORT || 3000 // 從環境變量存取埠號
app.use(morgan('dev')) // 開發模式
app.use(express.json())
app.use(cors())

app.use('/api',router)

app.use(errorHandler())
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})