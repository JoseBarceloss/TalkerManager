function checkRateDefined(rate, res) {
  if (!rate && rate !== 0) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  return false;
}
  
function checkRateValid(rate, res) {
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  return false;
}
  
const validateRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  
  if (checkRateDefined(rate, res) || checkRateValid(rate, res)) {
    return;
  }
  
  next();
};
  
module.exports = validateRate;