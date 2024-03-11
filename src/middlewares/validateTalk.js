const { HTTP_BAD_REQUEST_STATUS } = require('../utils/status');

const validateTalkObject = (talk, res) => {
  if (!talk || typeof talk !== 'object' || Array.isArray(talk)) {
    res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "talk" é obrigatório' });
    return true;
  }
  return false;
};
  
const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (validateTalkObject(talk, res)) {
    return;
  }
  
  next();
};
  
module.exports = validateTalk;
