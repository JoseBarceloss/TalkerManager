const express = require('express');
const { HTTP_OK_STATUS } = require('./utils/status');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || '3001';

app.use('/talker', require('./routes/talker.route'));
app.use('/talker', require('./routes/talkerID.route')); 
app.use('/login', require('./routes/login.route'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
