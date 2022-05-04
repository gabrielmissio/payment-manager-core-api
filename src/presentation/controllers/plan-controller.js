const { ResponseHelper } = require('../helpers');
const { AuthService, PlanService } = require('../../domain/services');
const { serialize, serializeList } = require('../serializers/plan-serializer');
const {
  ErrorMessagesEnum: { PLAN_NOT_FOUND }
} = require('../../utils/enums');

const createPlan = async (request) => {
  try {
    const newPlan = await PlanService.createPlan({
      ...request.body,
      requestUser: AuthService.getRequestUser(request.headers.authorization.split('Bearer ')[1])
    });

    return ResponseHelper.created(serialize(newPlan));
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getPlans = async () => {
  try {
    // TODO: implement filters
    const plans = await PlanService.getPlans();

    return ResponseHelper.ok(serializeList(plans));
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const updatePlan = async (request) => {
  try {
    const existingPlan = await PlanService.getPlan(request.params);
    if (!existingPlan) return ResponseHelper.notFound(PLAN_NOT_FOUND);

    const updatedPlan = await PlanService.updatePlan({
      ...request.body,
      planId: request.params.planId,
      requestUser: AuthService.getRequestUser(request.headers.authorization.split('Bearer ')[1])
    });

    return ResponseHelper.ok(serialize(updatedPlan));
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const deletePlan = async (request) => {
  try {
    const existingPlan = await PlanService.getPlan(request.params);
    if (!existingPlan) return ResponseHelper.notFound(PLAN_NOT_FOUND);

    const inactivePlan = await PlanService.deletePlan({
      ...existingPlan,
      requestUser: AuthService.getRequestUser(request.headers.authorization.split('Bearer ')[1])
    });

    return ResponseHelper.ok(inactivePlan); // TODO: replace ok with notContent
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

module.exports = {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan
};
