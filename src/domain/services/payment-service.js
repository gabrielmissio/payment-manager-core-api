const { MissingParamError } = require('../../utils/errors');
const { DataHelper } = require('../../utils/helpers');
const { PaymentRepository } = require('../../infra/repositories');
const {
  PaymentStatusEnum: { VALID }
} = require('../../utils/enums');

const createPayment = async ({ requestUser, planId, ...payload }) => {
  if (!requestUser) throw new MissingParamError('requestUser');
  if (!payload) throw new MissingParamError('payload');

  const currentDate = DataHelper.getCurrentDateISOString();
  const { username } = requestUser;

  const additionalInfo = {
    status: VALID,
    paymentId: currentDate,
    createdBy: username,
    lastUpdateBy: username,
    createdAt: currentDate,
    updatedAt: currentDate
  };

  const payment = { ...payload, ...additionalInfo };
  await PaymentRepository.create(payment);

  const { customerId, ...response } = payment;
  return response;
};

const getPayments = async ({ customerId }) => {
  const payments = await PaymentRepository.getPaymentsByCustomerId({ customerId });

  // TODO: implement pagination
  return payments;
};

module.exports = {
  createPayment,
  getPayments
};
