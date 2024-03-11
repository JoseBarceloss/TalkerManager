const { HTTP_SERVER_ERROR_STATUS } = require('./status');

function handleFileReadError(error, response) {
  console.error('Erro ao ler o arquivo:', error);
  response.status(HTTP_SERVER_ERROR_STATUS).send('Erro ao ler o arquivo.');
}

function handleJsonParseError(parseError, response) {
  console.error('Erro ao analisar os dados do arquivo:', parseError);
  response.status(HTTP_SERVER_ERROR_STATUS).send('Erro ao analisar os dados do arquivo.');
}

module.exports = { handleFileReadError, handleJsonParseError };
