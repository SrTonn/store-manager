const schemaSales = require('../joi/schemaSales');

const validateSalesMiddleware = (req, res, next) => {
  let hasError;
  req.body.forEach((element) => {
    const { error } = schemaSales.validate(element);
    if (error) {
      const { type, message } = error.details[0];

      const statusCode = {
        'any.required': 400,
        'string.min': 422,
        'number.min': 422,
      };

      hasError = true;
      res.status(statusCode[type]).json({ message });
    }
  });
  if (!hasError) next();
};

module.exports = validateSalesMiddleware;
