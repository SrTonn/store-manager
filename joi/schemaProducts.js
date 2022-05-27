const Joi = require('joi');

module.exports = Joi.object().keys({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});
