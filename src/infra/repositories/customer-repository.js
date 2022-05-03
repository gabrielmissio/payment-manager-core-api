const { DYNAMODB_DOCUMENT_CLIENT } = require('../../main/config/aws-resources');
const { PAYMENT_MANAGER_TABLE_NAME } = require('../../main/config/env');
const { MissingParamError } = require('../../utils/errors');
const { DynamodbHelper } = require('../helpers');
const { CustomerProfileAdapter } = require('../adapters');

const create = async (payload) => {
  const customer = CustomerProfileAdapter.inputOne(payload);

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    Item: customer
  };

  return DYNAMODB_DOCUMENT_CLIENT.put(parametros).promise();
};

const getProfileById = async (payload) => {
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
    IndexName: 'status-index',
    KeyConditionExpression: '#status = :status',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':status': status }
  };

  const data = await DYNAMODB_DOCUMENT_CLIENT.query(parametros).promise();
  return CustomerProfileAdapter.outputMany(data);
};

const updateProfileById = async (payload) => {
  const { PK, SK, ...profile } = CustomerProfileAdapter.inputOne(payload);
  if (!PK) throw new MissingParamError('PK');

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
