const { validationResult } = require('express-validator');
// can be reused by many routes

// parallel processing
module.exports = validations => { // 2. 判斷驗證結果
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) { // 空的就終止
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};