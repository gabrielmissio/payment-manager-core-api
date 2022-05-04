const { randomUUID } = require('crypto');

const generateUUID = () => randomUUID();

module.exports = {
  generateUUID
};
