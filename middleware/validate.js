const { validationResult, buildCheckFunction } = require("express-validator");
const mongoose = require("mongoose");
// can be reused by many routes

// parallel processing
exports = module.exports = validations => { // 2. 判斷驗證結果
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) { // 空的就終止
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};
exports.isValidObjectId=(location,fields)=>{
  // buildCheckFunction() 會回傳一個 check()
  return buildCheckFunction(location)(fields).custom(async value=>{
    if(!mongoose.isValidObjectId(value)){
      return Promise.reject("ID 不是一個有效的 Object ID")
    }
  })
}