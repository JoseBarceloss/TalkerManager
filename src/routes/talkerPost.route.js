const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const { HTTP_CREATED_STATUS, HTTP_SERVER_ERROR_STATUS } = require('../utils/status');

const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/valdiateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/valdiateWatchedAt');
const validateRate = require('../middlewares/validateRate');

const router = express.Router();
const TALKER_FILE_PATH = path.join(__dirname, '../talker.json');

router.post('/', 
  validateToken, 
  validateName, 
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate, async (req, res) => {
    try {
      const data = await fs.readFile(TALKER_FILE_PATH, 'utf8');
      const talkers = JSON.parse(data);

      const { name, age, talk } = req.body;

      const id = talkers.length + 1;

      const newTalker = { id, name, age, talk };
      talkers.push(newTalker);

      await fs.writeFile(TALKER_FILE_PATH, JSON.stringify(talkers));

      res.status(HTTP_CREATED_STATUS).json(newTalker);
    } catch (error) {
      console.error('Erro ao adicionar novo palestrante:', error);
      res.status(HTTP_SERVER_ERROR_STATUS).send('Erro interno do servidor.');
    }
  });

module.exports = router;
