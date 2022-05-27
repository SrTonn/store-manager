const schemaProducts = require('../joi/schemaProducts');

const validateProductsMiddleware = (req, res, next) => {
  const { error } = schemaProducts.validate(req.body);
  if (error) {
    const { type, message } = error.details[0];

    const statusCode = {
      'any.required': 400,
      'string.min': 422,
      'number.min': 422,
    };

    return res.status(statusCode[type]).json({ message });
  }
  next();
};

module.exports = validateProductsMiddleware;
