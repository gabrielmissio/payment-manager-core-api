const DataFaker = require('./data-faker');

const getOne = () => ({
  PK: `CLIENT#${DataFaker.getString()}`,
  SK: 'PROFILE',
  name: DataFaker.getSentence(),
  email: DataFaker.getEmail(),
  cpf: DataFaker.getString(),
  createdAt: new Date().toISOString(),
  updateddAt: new Date().toISOString()
});

module.exports = { getOne };
