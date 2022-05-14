const { MissingParamError } = require('../../utils/errors');
const { DataHelper } = require('../../utils/helpers');
const { CustomerRepository } = require('../../infra/repositories');
const {
  CustomerStatusEnum: { ACTIVE, INACTIVE },
  ErrorMessagesEnum: { CUSTOMER_ALREADY_INACTIVE }
} = require('../../utils/enums');

const createCustomer = async ({ requestUser, ...payload }) => {
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

  const customer = { ...payload, ...additionalInfo, customerId: payload.cpf };
  await CustomerRepository.createCustomer(customer);

  return customer;
};

const getCustomer = async ({ customerId }) => {
  if (!customerId) throw new MissingParamError('customerId');

  const customer = await CustomerRepository.getCustomerById({ customerId });
  return customer;
};

const getCustomers = async (filters = { status: ACTIVE }) => {
  const customers = await CustomerRepository.getCustomers(filters);

  // TODO: implement pagination
  return customers;
};

const updateCustomer = async ({ requestUser, cpf, ...payload }) => {
  if (!requestUser) throw new MissingParamError('requestUser');
  if (!payload) throw new MissingParamError('payload');

  const currentDate = DataHelper.getCurrentDateISOString();
  const dataForUpdate = { ...payload, updatedAt: currentDate, lastUpdateBy: requestUser.username };

  const customer = await CustomerRepository.updateCustomerById(dataForUpdate);
  return customer;
};

const deleteCustomer = async ({ requestUser, customerId, status }) => {
  if (!customerId) throw new MissingParamError('customerId');
  if (status && status === INACTIVE) return { message: CUSTOMER_ALREADY_INACTIVE };

  const dataForUpdate = { requestUser, customerId, status: INACTIVE };
  const data = await updateCustomer(dataForUpdate);

  return data;
};

module.exports = {
  createCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer
};
