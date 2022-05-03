const { ResponseHelper } = require('../helpers');
const { AuthService, CustomerPaymentService, CustomerProfileService } = require('../../domain/services');
const { serialize, serializeList } = require('../serializers/customer-payment-serializer');
const {
  ErrorMessagesEnum: { CUSTOMER_NOT_FOUND }
} = require('../../utils/enums');

const createPayment = async (request) => {
  try {
    const newPayment = await CustomerPaymentService.createPayment({
      ...request.body,
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
    const customer = await CustomerProfileService.getProfile(request.params);
    if (!customer) return ResponseHelper.notFound(CUSTOMER_NOT_FOUND);

    // TODO: implement filters
    const payments = await CustomerPaymentService.getPayments(request.params);

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
