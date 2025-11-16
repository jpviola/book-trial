const Feedback = require('../models/feedback');
const logger = require('../utils/logger');

const feedbackController = {
  submit: async (req, res, next) => {
    try {
      const { chapter_id, email, feedback_text, rating } = req.body;

      const feedback = await Feedback.create(chapter_id, email, feedback_text, rating);

      logger.info(`New feedback for chapter ${chapter_id} from ${email}`);

      res.status(201).json({
        success: true,
        message: 'Thank you for your feedback!',
        feedback
      });
    } catch (error) {
      logger.error('Feedback submit error', error.message);
      next(error);
    }
  },

  getByChapter: async (req, res, next) => {
    try {
      const chapterId = parseInt(req.params.id, 10);
      const feedbackList = await Feedback.getByChapter(chapterId);
      const avgRating = await Feedback.getAverageRatingByChapter(chapterId);

      res.json({
        chapter_id: chapterId,
        count: feedbackList.length,
        average_rating: avgRating,
        feedback: feedbackList
      });
    } catch (error) {
      logger.error('Get feedback error', error.message);
      next(error);
    }
  },

  getStats: async (req, res, next) => {
    try {
      const total = await Feedback.count();
      res.json({ total_feedback: total });
    } catch (error) {
      logger.error('Get stats error', error.message);
      next(error);
    }
  }
};

module.exports = feedbackController;