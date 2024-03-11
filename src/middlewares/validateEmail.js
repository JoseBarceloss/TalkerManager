function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!email || email.trim() === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
}
  
module.exports = { validateEmail };
