const express = require('express');
const generateToken = require('../utils/generateToken');
const { HTTP_OK_STATUS } = require('../utils/status');
const { validateEmail } = require('../middlewares/validateEmail');
const { validatePassword } = require('../middlewares/validatePassword');

const login = express.Router();

login.post('/', validateEmail, validatePassword, (request, response) => {
  const { email, password } = request.body;
  const token = generateToken();

  if (email !== undefined && password !== undefined) {
    return response.status(HTTP_OK_STATUS).json({ token });
  }
});

module.exports = login;
