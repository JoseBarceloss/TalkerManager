const express = require('express');
const fs = require('fs').promises; // Importe o módulo 'fs' com suporte a Promises
const { HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS } = require('../utils/status');
const { handleFileReadError } = require('../utils/errorHandlers');

const router = express.Router();

router.get('/:id', async (request, response) => {
  try {
    const data = await fs.readFile('src/talker.json', 'utf8');
    const talkers = JSON.parse(data);
    const id = Number(request.params.id);

    const talker = talkers.find((i) => i.id === id);

    if (talker) {
      response.status(HTTP_OK_STATUS).json(talker);
    } else {
      response.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
    }
  } catch (error) {
    handleFileReadError(error, response);
  }
});

module.exports = router;
