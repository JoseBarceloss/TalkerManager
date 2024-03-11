const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { HTTP_OK_STATUS } = require('../utils/status');
const { validateToken } = require('../middlewares/validateToken');

const router = express.Router();
const TALKER_FILE_PATH = path.join(__dirname, '../talker.json');

router.get('/talker/search', validateToken, async (req, res) => {
  const searchTerm = req.query.q;
  const data = await fs.readFile(TALKER_FILE_PATH);
  const talkers = JSON.parse(data);

  if (!searchTerm) {
    return res.status(HTTP_OK_STATUS).json(talkers);
  }

  const filteredTalkers = talkers.filter((i) =>
    i.name.includes(searchTerm));

  return res.status(HTTP_OK_STATUS).json(filteredTalkers);
});

module.exports = router;
