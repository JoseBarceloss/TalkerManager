const express = require('express');
const { HTTP_OK_STATUS } = require('./utils/status');

const talkerRouter = require('./routes/talker.route');
const talkerIdRouter = require('./routes/talkerID.route');
const loginRouter = require('./routes/login.route');
const talkerPostRouter = require('./routes/talkerPost.route');
const talkerPutRouter = require('./routes/TalkerPutID.route');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || '3001';

app.use('/talker', talkerRouter);
app.use('/talker', talkerIdRouter);
app.use('/login', loginRouter);
app.use('/talker', talkerPostRouter);
app.use('/talker', talkerPutRouter); 

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
