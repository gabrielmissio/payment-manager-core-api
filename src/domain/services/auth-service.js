const { TokenDecoder } = require('../../utils/helpers');

const getRequestUser = (payload) => {
  const tokenPayload = TokenDecoder.decode(payload);
  return { username: tokenPayload.username };
};

module.exports = {
  getRequestUser
};
