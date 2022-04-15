const Chance = require('chance');

const dataFaker = new Chance();

const getString = ({ length, pool, alpha, casing, symbols } = {}) =>
  dataFaker.string({ length, pool, alpha, casing, symbols });

const getSentence = ({ words } = {}) => dataFaker.sentence({ words });

const getInteger = ({ min, max } = {}) => dataFaker.integer({ min, max });

const getEmail = ({ domain } = {}) => dataFaker.email({ domain });

const getObject = ({ length } = { length: 1 }) => {
  const newObject = {};
  const pool = 'abcdefghijklmnopqrstuvwxyz';
  const getKeyOrValueSettings = { length: 4, pool };

  for (let index = 0; index < length; index += 1) {
    Object.assign(newObject, {
      [getString(getKeyOrValueSettings)]: getString(getKeyOrValueSettings)
    });
  }

  return newObject;
};

module.exports = {
  getString,
  getSentence,
  getInteger,
  getEmail,
  getObject
};
