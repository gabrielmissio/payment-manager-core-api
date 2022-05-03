const { DYNAMODB_DOCUMENT_CLIENT } = require('../../main/config/aws-resources');
const { PAYMENT_MANAGER_TABLE_NAME } = require('../../main/config/env');
const { MissingParamError } = require('../../utils/errors');
const { CustomerPaymentAdapter } = require('../adapters');

const create = async (payload) => {
  if (!payload) throw new MissingParamError('payload');
  const payment = CustomerPaymentAdapter.inputOne(payload);

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    Item: payment
  };

  return DYNAMODB_DOCUMENT_CLIENT.put(parametros).promise();
};

const getPaymentsByCustomerId = async (payload) => {
  if (!payload) throw new MissingParamError('payload');
  const { PK } = CustomerPaymentAdapter.inputOne(payload);

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    KeyConditionExpression: 'PK = :PK AND begins_with(SK, :payment)',
    ExpressionAttributeValues: { ':PK': PK, ':payment': 'PAYMENT#' }
  };

  const data = await DYNAMODB_DOCUMENT_CLIENT.query(parametros).promise();
  return CustomerPaymentAdapter.outputMany(data);
};

module.exports = {
  create,
  getPaymentsByCustomerId
};
