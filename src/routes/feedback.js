const express = require('express');
const Joi = require('joi');
const feedbackController = require('../controllers/feedbackController');

const router = express.Router();

const feedbackSchema = Joi.object({
  chapter_id: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  feedback_text: Joi.string().min(5).max(1000).required(),
  rating: Joi.number().integer().min(1).max(5).required()
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

router.post('/submit', validateRequest(feedbackSchema), feedbackController.submit);
router.get('/chapter/:id', feedbackController.getByChapter);
router.get('/stats', feedbackController.getStats);

module.exports = router;