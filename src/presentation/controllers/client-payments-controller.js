const { ResponseHelper } = require('../helpers');

const getPayments = async (request) => {
  try {
    return ResponseHelper.ok({ request, message: '(GET) - /client/:client/payment' });
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

module.exports = {
  getPayments
};
