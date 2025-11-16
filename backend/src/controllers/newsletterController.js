const Subscriber = require('../models/subscriber');
const { sendConfirmationEmail } = require('../utils/emailService');
const config = require('../config/config');
const logger = require('../utils/logger');

const newsletterController = {
  subscribe: async (req, res, next) => {
    try {
      const { email, language = 'en' } = req.body;

      const subscriber = await Subscriber.create(email, language);
      const confirmUrl = `${config.frontend}/confirm.html?email=${encodeURIComponent(email)}`;

      await sendConfirmationEmail(email, language, confirmUrl);

      logger.info(`New subscriber: ${email}`);

      res.status(201).json({
        success: true,
        message: language === 'es'
          ? 'Revisa tu correo para confirmar la suscripción'
          : 'Check your email to confirm subscription',
        subscriber
      });
    } catch (error) {
      logger.error('Subscribe error', error.message);
      next(error);
    }
  },

  confirm: async (req, res, next) => {
    try {
      const subscriber = await Subscriber.confirm(req.params.email);

      logger.info(`Email confirmed: ${req.params.email}`);

      res.json({
        success: true,
        message: 'Email confirmed! You will receive updates.',
        subscriber
      });
    } catch (error) {
      logger.error('Confirm error', error.message);
      next(error);
    }
  },

  getCount: async (req, res, next) => {
    try {
      const count = await Subscriber.count();
      res.json({ subscribers: count });
    } catch (error) {
      logger.error('Get count error', error.message);
      next(error);
    }
  }
};

module.exports = newsletterController;