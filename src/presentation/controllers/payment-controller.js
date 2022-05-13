const { ResponseHelper } = require('../helpers');
const { AuthService, PaymentService, CustomerService, PlanService } = require('../../domain/services');
const { serialize, serializeList } = require('../serializers/customer-payment-serializer');
const {
  ErrorMessagesEnum: { CUSTOMER_NOT_FOUND, PLAN_NOT_FOUND }
} = require('../../utils/enums');

const createPayment = async (request) => {
  try {
    const customer = await CustomerService.getProfile(request.params);
    if (!customer) return ResponseHelper.notFound(CUSTOMER_NOT_FOUND);

    const plan = await PlanService.getPlan(request.body);
    if (!plan) return ResponseHelper.notFound(PLAN_NOT_FOUND);

    const newPayment = await PaymentService.createPayment({
      ...request.body,
      plan,
      customerId: request.params.customerId,
      requestUser: AuthService.getRequestUser(request.headers.authorization.split('Bearer ')[1])
    });

    return ResponseHelper.created(serialize(newPayment));
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getPayments = async (request) => {
  try {
    const customer = await CustomerService.getProfile(request.params);
    if (!customer) return ResponseHelper.notFound(CUSTOMER_NOT_FOUND);

    // TODO: implement filters
    const payments = await PaymentService.getPayments(request.params);

    return ResponseHelper.ok(serializeList(payments));
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

module.exports = {
  createPayment,
  getPayments
};
