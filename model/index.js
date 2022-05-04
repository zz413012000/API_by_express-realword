// const uri = "mongodb+srv://root:zz147258@mycluster.uiu0q.mongodb.net/realworld?retryWrites=true&w=majority";
const mongoose=require('mongoose')
const {dbUrl}=require('../config/config.default')
try {
    // Connect to the MongoDB cluster
     mongoose.connect(
        dbUrl,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }
const db=mongoose.connection
db.on('error',function(){
    console.log("DB 連接失敗")
})
db.once('open',function(){
    console.log(' DB 連接成功')
})
// 導出 model 
module.exports={
    User:mongoose.model('User',require('./user')), // mongoose 默認需要使用單數大寫，傳到 Atlas 會變成複數小寫
    Article:mongoose.model('Article',require('./article'))
}

// // 範例
// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));