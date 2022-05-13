const { DYNAMODB_DOCUMENT_CLIENT } = require('../../main/config/aws-resources');
const { PAYMENT_MANAGER_TABLE_NAME } = require('../../main/config/env');
const { MissingParamError } = require('../../utils/errors');
const { DynamodbHelper } = require('../helpers');
const { PlanAdapter } = require('../adapters');

const createPlan = async (payload) => {
  if (!payload) throw new MissingParamError('payload');
  const plan = PlanAdapter.inputOne(payload);

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    Item: plan
  };

  return DYNAMODB_DOCUMENT_CLIENT.put(parametros).promise();
};

const getPlanById = async (payload) => {
  if (!payload) throw new MissingParamError('payload');
  const { SK } = PlanAdapter.inputOne(payload);

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    Key: { PK: 'PLAN', SK }
  };

  const data = await DYNAMODB_DOCUMENT_CLIENT.get(parametros).promise();
  return PlanAdapter.outputOne(data);
};

const getPlansByStatus = async ({ status } = {}) => {
  if (!status) throw new MissingParamError('status');

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    KeyConditionExpression: 'PK = :PK',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':PK': 'PLAN', ':status': status },
    FilterExpression: '#status = :status' // TODO: make dynamodb filter expression
  };

  const data = await DYNAMODB_DOCUMENT_CLIENT.query(parametros).promise();
  return PlanAdapter.outputMany(data);
};

const updatePlanById = async (payload) => {
  if (!payload) throw new MissingParamError('payload');
  const { PK, SK, ...plan } = PlanAdapter.inputOne(payload);

  const parametros = {
    TableName: PAYMENT_MANAGER_TABLE_NAME,
    Key: { PK: 'PLAN', SK },
    ReturnValues: 'ALL_NEW'
  };

  Object.assign(parametros, DynamodbHelper.makeDynamicUpdateParams(plan));
  const data = await DYNAMODB_DOCUMENT_CLIENT.update(parametros).promise();

  return PlanAdapter.outputOne(data);
};

module.exports = {
  createPlan,
  getPlanById,
  getPlansByStatus,
  updatePlanById
};
