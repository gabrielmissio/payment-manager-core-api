const { DYNAMODB_DOCUMENT_CLIENT } = require('../../main/config/aws-resources');
const { PAYMENT_MANAGER_TABLE_NAME } = require('../../main/config/env');
const { MissingParamError } = require('../../utils/errors');
const { DynamodbHelper } = require('../helpers');

const create = async ({ client } = {}) => {
  if (!client.PK) throw new MissingParamError('PK');
  if (!client.SK) throw new MissingParamError('SK');
  if (!client.cpf) throw new MissingParamError('cpf');

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    Item: client
  };

  return DYNAMODB_DOCUMENT_CLIENT.put(parametros).promise();
};

const getProfileByPK = async ({ PK } = {}) => {
  if (!PK) throw new MissingParamError('PK');

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    Key: { PK, SK: 'PROFILE' }
  };

  return DYNAMODB_DOCUMENT_CLIENT.get(parametros).promise();
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

  return DYNAMODB_DOCUMENT_CLIENT.query(parametros).promise();
};

const updateProfileByPK = async ({ PK, SK, ...profile }) => {
  if (!PK) throw new MissingParamError('PK');

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    Key: { PK, SK: 'PROFILE' },
    ReturnValues: 'ALL_NEW'
  };

  Object.assign(parametros, DynamodbHelper.makeDynamicUpdateParams(profile));
  return DYNAMODB_DOCUMENT_CLIENT.update(parametros).promise();
};

module.exports = {
  create,
  getProfileByPK,
  getProfilesByStatus,
  updateProfileByPK
};
