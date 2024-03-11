const express = require('express');
const fs = require('fs');
const { HTTP_OK_STATUS } = require('../utils/status');
const { handleFileReadError, handleJsonParseError } = require('../utils/errorHandlers');

const router = express.Router();

router.get('/', (_request, response) => {
  fs.readFile('src/talker.json', 'utf8', (error, data) => {
    if (error) {
      handleFileReadError(error, response);
      return;
    }
    try {
      const talkers = JSON.parse(data);
      if (!talkers || talkers.length === 0) {
        response.status(HTTP_OK_STATUS).json([]);
      } else {
        response.status(HTTP_OK_STATUS).json(talkers);
      }
    } catch (parseError) {
      handleJsonParseError(parseError, response);
    }
  });
});

module.exports = router;
