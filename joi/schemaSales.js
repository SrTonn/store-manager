const Joi = require('joi');

module.exports = Joi.object().keys({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
});
