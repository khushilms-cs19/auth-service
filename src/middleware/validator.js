const Joi = require('joi');

const schemas = {
  user: Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(6).max(20).required()
  }),
  validate: Joi.object({ token: Joi.string().min(10).max(255).required() })
};
const REQ_PARAMTERS = {
  BODY: 'body',
  HEADER: 'headers',
  QUERY: 'query',
  PARAMS: 'params'
};

/**
 *
 * @param {joi.Schema} schema
 * @param {String} parameterType

 */
const validate = (schema, parameterType) => (req, res, next) => {
  const { error } = schema.validate(req[parameterType]);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { validate, REQ_PARAMTERS, schemas };
