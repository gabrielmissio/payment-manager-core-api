const { DYNAMODB_DOCUMENT_CLIENT } = require('../../main/config/aws-resources');
const { PAYMENT_MANAGER_TABLE_NAME } = require('../../main/config/env');
const { MissingParamError } = require('../../utils/errors');
const { DynamodbHelper } = require('../helpers');
const { CustomerProfileAdapter } = require('../adapters');

const create = async (payload) => {
  if (!payload) throw new MissingParamError('payload');
  const customer = CustomerProfileAdapter.inputOne(payload);

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    Item: customer
  };

  return DYNAMODB_DOCUMENT_CLIENT.put(parametros).promise();
};

const getProfileById = async (payload) => {
  if (!payload) throw new MissingParamError('payload');
  const { PK } = CustomerProfileAdapter.inputOne(payload);

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    Key: { PK, SK: 'PROFILE' }
  };

  const data = await DYNAMODB_DOCUMENT_CLIENT.get(parametros).promise();
  return CustomerProfileAdapter.outputOne(data);
};

const getProfilesByStatus = async ({ status } = {}) => {
  if (!status) throw new MissingParamError('status');

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    IndexName: 'sk-index',
    KeyConditionExpression: 'SK = :SK AND begins_with(PK, :PK)',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':SK': 'PROFILE', ':PK': 'CUSTOMER#', ':status': status },
    FilterExpression: '#status = :status' // TODO: make dynamodb filter expression
  };

  const data = await DYNAMODB_DOCUMENT_CLIENT.query(parametros).promise();
  return CustomerProfileAdapter.outputMany(data);
};

const updateProfileById = async (payload) => {
  if (!payload) throw new MissingParamError('payload');
  const { PK, SK, ...profile } = CustomerProfileAdapter.inputOne(payload);

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    Key: { PK, SK: 'PROFILE' },
    ReturnValues: 'ALL_NEW'
  };

  Object.assign(parametros, DynamodbHelper.makeDynamicUpdateParams(profile));
  const data = await DYNAMODB_DOCUMENT_CLIENT.update(parametros).promise();

  return CustomerProfileAdapter.outputOne(data);
};

module.exports = {
  create,
  getProfileById,
  getProfilesByStatus,
  updateProfileById
};
