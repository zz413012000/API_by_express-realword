const crypto=require('crypto')
// get crypto 支援的散列算法
// console.log(crypto.getHashes())
// const result=crypto.createHash('md5')
//     .update('hello')
//     .digest('hex'); // 編碼 16進位
//     console.log(result);

module.exports= str => crypto.createHash('md5').update(str).digest('hex')