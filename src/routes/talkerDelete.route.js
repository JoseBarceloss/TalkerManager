const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { 
  HTTP_UNAUTHORIZED_STATUS, 
  HTTP_NOT_FOUND_STATUS, 
  HTTP_NO_CONTENT_STATUS } = require('../utils/status');

const validateToken = require('../middlewares/validateToken');

const router = express.Router();
const TALKER_FILE_PATH = path.join(__dirname, '../talker.json');

router.delete('/:id', validateToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await fs.readFile(TALKER_FILE_PATH);
    let talkers = JSON.parse(data);
    const index = talkers.findIndex((talker) => talker.id === id);
    if (index === -1) {
      return res.status(HTTP_NOT_FOUND_STATUS).json(
        { message: 'Pessoa palestrante não encontrada' },
      );
    }
    talkers = talkers.filter((talker) => talker.id !== id);
    await fs.writeFile(TALKER_FILE_PATH, JSON.stringify(talkers));
    return res.status(HTTP_NO_CONTENT_STATUS).send();
  } catch (error) {
    console.error('Erro ao deletar palestrante:', error);
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }
});

module.exports = router;
