const { ResponseHelper } = require('../helpers');
const { CustomerPaymentService, CustomerProfileService } = require('../../domain/services');

const createPayment = async (request) => {
  try {
    const newPayment = await CustomerPaymentService.createPayment({
      ...request.body,
      customerId: request.params.customerId
    });

    return ResponseHelper.created(newPayment);
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getPayments = async (request) => {
  try {
    const customer = await CustomerProfileService.getProfile(request.params);
    if (!customer) return ResponseHelper.notFound('CLIENT NOT FOUND');

    // TODO: implement filters
    const payments = await CustomerPaymentService.getPayments(request.params);

    return ResponseHelper.ok(payments);
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

module.exports = {
  createPayment,
  getPayments
};
