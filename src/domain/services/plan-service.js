const { MissingParamError } = require('../../utils/errors');
const { DataHelper, IdentifierGenerator } = require('../../utils/helpers');
const { PlanRepository } = require('../../infra/repositories');
const {
  PlanStatusEnum: { ACTIVE, INACTIVE },
  ErrorMessagesEnum: { PLAN_ALREADY_INACTIVE }
} = require('../../utils/enums');

const createPlan = async ({ requestUser, ...payload }) => {
  if (!requestUser) throw new MissingParamError('requestUser');
  if (!payload) throw new MissingParamError('payload');

  const currentDate = DataHelper.getCurrentDateISOString();
  const { username } = requestUser;

  const additionalInfo = {
    createdBy: username,
    lastUpdateBy: username,
    createdAt: currentDate,
    updatedAt: currentDate,
    status: ACTIVE
  };

  const plan = { ...payload, ...additionalInfo, planId: IdentifierGenerator.generateUUID() };
  await PlanRepository.createPlan(plan);

  return plan;
};

const getPlan = async ({ planId }) => {
  if (!planId) throw new MissingParamError('planId');

  const plan = await PlanRepository.getPlanById({ planId });
  return plan;
};

const getPlans = async (filters = { status: ACTIVE }) => {
  const plans = await PlanRepository.getPlansByStatus(filters);

  // TODO: implement pagination
  return plans;
};

const updatePlan = async ({ requestUser, cpf, ...payload }) => {
  if (!requestUser) throw new MissingParamError('requestUser');
  if (!payload) throw new MissingParamError('payload');

  const currentDate = DataHelper.getCurrentDateISOString();
  const dataForUpdate = { ...payload, updatedAt: currentDate, lastUpdateBy: requestUser.username };

  const plan = await PlanRepository.updatePlanById(dataForUpdate);
  return plan;
};

const deletePlan = async ({ requestUser, planId, status }) => {
  if (!planId) throw new MissingParamError('planId');
  if (status && status === INACTIVE) return { message: PLAN_ALREADY_INACTIVE };

  const dataForUpdate = { requestUser, planId, status: INACTIVE };
  const data = await updatePlan(dataForUpdate);

  return data;
};

module.exports = {
  createPlan,
  getPlan,
  getPlans,
  updatePlan,
  deletePlan
};
