const { HTTP_BAD_REQUEST_STATUS } = require('../utils/status');

function checkAgeDefined(age, res) {
  if (age === undefined || age === null || age === '') {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo "age" é obrigatório' },
    );
  }
  return false;
}
  
function checkAgeValid(age, res) {
  if (!Number.isInteger(age) || age < 18) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json(
      { message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' },
    );
  }
  return false;
}
  
function validateAge(req, res, next) {
  const { age } = req.body;
  
  if (checkAgeDefined(age, res) || checkAgeValid(age, res)) {
    return;
  }
  
  next();
}

module.exports = validateAge;