const { MissingParamError } = require('../errors');

const decode = (token) => {
  if (!token) throw new MissingParamError('token');

  const splitedToken = token.split('.');
  const base64Payload = splitedToken[1].replace('-', '+').replace('_', '/');
  const decodedPayload = JSON.parse(Buffer.from(base64Payload, 'base64').toString('binary'));

  return decodedPayload;
};

module.exports = {
  decode
};
