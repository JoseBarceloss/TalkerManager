const crypto = require('crypto');

function generateToken() {
  try {
    return crypto.randomBytes(8).toString('hex');
  } catch (error) {
    console.error('Erro ao gerar token:', error);
    throw new Error('Erro ao gerar token');
  }
}

module.exports = generateToken;
