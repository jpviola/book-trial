const express = require('express');
const Joi = require('joi');
const newsletterController = require('../controllers/newsletterController');

const router = express.Router();

const subscribeSchema = Joi.object({
  email: Joi.string().email().required(),
  language: Joi.string().valid('en', 'es').default('en')
});

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    req.body = value;
    next();
  };
};

router.post('/subscribe', validateRequest(subscribeSchema), newsletterController.subscribe);
router.get('/confirm/:email', newsletterController.confirm);
router.get('/count', newsletterController.getCount);

module.exports = router;