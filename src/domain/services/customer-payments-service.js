const { MissingParamError } = require('../../utils/errors');
const { DataHelper } = require('../../utils/helpers');
const { PaymentRepository } = require('../../infra/repositories');
const { CustomerPaymentAdapter } = require('../../infra/adapters');

const createPayment = async ({ requestUser, ...payload }) => {
  if (!requestUser) throw new MissingParamError('requestUser');
  if (!payload) throw new MissingParamError('payload');

  const currentDate = DataHelper.getCurrentDateISOString();
  const additionalInfo = {
    paymentId: currentDate,
    createdAt: currentDate,
    updatedAt: currentDate,
    createdBy: requestUser.username
  };

  const payment = { ...payload, ...additionalInfo };
  await PaymentRepository.create({ payment: CustomerPaymentAdapter.inputOne(payment) });

  const { customerId, ...response } = payment;
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
