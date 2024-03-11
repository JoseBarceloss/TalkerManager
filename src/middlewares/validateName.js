const { HTTP_BAD_REQUEST_STATUS } = require('../utils/status');

function validateName(req, res, next) {
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo "name" é obrigatório' },
    );
  }

  if (name.trim().length < 3) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O "name" deve ter pelo menos 3 caracteres' },
    );
  }

  next();
}

module.exports = validateName;
