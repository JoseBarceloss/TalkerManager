const express = require('express');
const generateToken = require('../utils/generateToken');
const { HTTP_OK_STATUS } = require('../utils/status');

const router = express.Router();

router.post('/', (request, response) => {
  const { email, password } = request.body;
  const token = generateToken();

  if (email !== undefined && password !== undefined) {
    return response.status(HTTP_OK_STATUS).json({ token });
  }
});

module.exports = router;
