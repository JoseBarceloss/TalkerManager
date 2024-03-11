const { HTTP_BAD_REQUEST_STATUS } = require('../utils/status');

const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk || {};

  if (!watchedAt) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }

  const watchedAtRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAtRegex.test(watchedAt)) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

module.exports = validateWatchedAt;
