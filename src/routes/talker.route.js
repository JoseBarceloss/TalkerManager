const express = require('express');
const fs = require('fs');
const { HTTP_OK_STATUS, HTTP_SERVER_ERROR_STATUS } = require('../utils/status');

const router = express.Router();
router.get('/', (_request, response) => {
  fs.readFile('src/talker.json', 'utf8', (error, data) => {
    if (error) {
      console.error('Erro ao ler o arquivo:', error);
      return response.status(HTTP_SERVER_ERROR_STATUS).send('Erro ao ler o arquivo.');
    }
    try {
      const talkers = JSON.parse(data);
      if (!talkers || talkers.length === 0) {
        return response.status(HTTP_OK_STATUS).json([]);
      }
      response.status(HTTP_OK_STATUS).json(talkers);
    } catch (parseError) {
      console.error('Erro ao analisar os dados do arquivo:', parseError);
      return response.status(HTTP_SERVER_ERROR_STATUS).send(
        'Erro ao analisar os dados do arquivo.',
      );
    }
  });
});

module.exports = router;
