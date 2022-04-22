const { DYNAMODB_DOCUMENT_CLIENT } = require('../../main/config/aws-resources');
const { PAYMENT_MANAGER_TABLE_NAME } = require('../../main/config/env');
const { MissingParamError } = require('../../utils/errors');

const create = async ({ payment } = {}) => {
  if (!payment.PK) throw new MissingParamError('PK');
  if (!payment.SK) throw new MissingParamError('SK');
  if (!payment.value) throw new MissingParamError('value');

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    Item: payment
  };

  return DYNAMODB_DOCUMENT_CLIENT.put(parametros).promise();
};

const getPaymentsByPK = async ({ PK } = {}) => {
  if (!PK) throw new MissingParamError('PK');

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    KeyConditionExpression: 'PK = :PK AND begins_with(SK, :payment)',
    ExpressionAttributeValues: { ':PK': `CUSTOMER#${PK}`, ':payment': 'PAYMENT#' }
  };

  return DYNAMODB_DOCUMENT_CLIENT.query(parametros).promise();
};

module.exports = {
  create,
  getPaymentsByPK
};
