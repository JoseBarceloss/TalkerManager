const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const { 
  HTTP_NOT_FOUND_STATUS, 
  HTTP_OK_STATUS, 
  HTTP_SERVER_ERROR_STATUS } = require('../utils/status');

const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/valdiateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/valdiateWatchedAt');
const validateRate = require('../middlewares/validateRate');

const router = express.Router();
const TALKER_FILE_PATH = path.join(__dirname, '../talker.json');

router.put('/:id', 
  validateToken, 
  validateName, 
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = await fs.readFile(TALKER_FILE_PATH);
      const talkers = JSON.parse(data);
      const index = talkers.findIndex((talker) => talker.id === id);
      if (index === -1) {
        return res.status(HTTP_NOT_FOUND_STATUS).json(
          { message: 'Pessoa palestrante não encontrada' },
        );
      }
      talkers[index] = { ...talkers[index], ...req.body };
      await fs.writeFile(TALKER_FILE_PATH, JSON.stringify(talkers));

      return res.status(HTTP_OK_STATUS).json(talkers[index]);
    } catch (error) {
      console.error('Erro ao atualizar palestrante:', error);
      return res.status(HTTP_SERVER_ERROR_STATUS).send('Erro interno do servidor.');
    }
  });

module.exports = router;
