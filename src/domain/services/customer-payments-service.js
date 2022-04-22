const { MissingParamError } = require('../../utils/errors');
const { DataHelper } = require('../../utils/helpers');
const { PaymentRepository } = require('../../infra/repositories');
const { CustomerPaymentAdapter } = require('../../infra/adapters');

const createPayment = async (payload) => {
  if (!payload) throw new MissingParamError('payload');

  const currentDate = DataHelper.getCurrentDateISOString();
  const additionalInfo = {
    paymentId: currentDate,
    createdAt: currentDate,
    updatedAt: currentDate
  };

  const payment = { ...payload, ...additionalInfo };
  await PaymentRepository.create({ payment: CustomerPaymentAdapter.inputOne(payment) });

  const { customerId, ...response } = { ...payment, createdBy: 'ADMIN' }; // TODO: remove hardcoded createdBy param
  return response;
};

const getPayments = async ({ customerId }) => {
  const data = await PaymentRepository.getPaymentsByPK({ PK: customerId });
  const payments = CustomerPaymentAdapter.outputMany(data);

  // TODO: implement pagination
  return payments;
};

module.exports = {
  createPayment,
  getPayments
};
