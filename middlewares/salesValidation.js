const schemaSales = require('../joi/schemaSales');

const validateSalesMiddleware = (req, res, next) => {
  req.body.forEach((element) => {
    const { error } = schemaSales.validate(element);
    if (error) {
      const { type, message } = error.details[0];

      const statusCode = {
        'any.required': 400,
        'string.min': 422,
        'number.min': 422,
      };

      return res.status(statusCode[type]).json({ message });
    }
  });
  next();
};

module.exports = validateSalesMiddleware;
