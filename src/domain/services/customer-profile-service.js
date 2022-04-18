const { MissingParamError } = require('../../utils/errors');
const { DataHelper } = require('../../utils/helpers');
const { CustomerRepository } = require('../../infra/repositories');
const { CustomerProfileAdapter } = require('../../infra/adapters');

const createProfile = async (payload) => {
  if (!payload) throw new MissingParamError('payload');

  const currentDate = DataHelper.getCurrentDateISOString();
  const additionalInfo = {
    createdAt: currentDate,
    updatedAt: currentDate,
    status: 'ACTIVE'
  };

  const customer = { ...payload, ...additionalInfo, customerId: payload.cpf };
  await CustomerRepository.create({ customer: CustomerProfileAdapter.inputOne(customer) });

  return customer;
};

const getProfile = async ({ customerId }) => {
  if (!customerId) throw new MissingParamError('customerId');

  const data = await CustomerRepository.getProfileByPK(CustomerProfileAdapter.inputOne({ customerId }));
  const customer = CustomerProfileAdapter.outputOne(data);

  return customer;
};

const getProfiles = async (filters = { status: 'ACTIVE' }) => {
  const data = await CustomerRepository.getProfilesByStatus(filters);
  const customers = CustomerProfileAdapter.outputMany(data);

  // TODO: implement pagination
  return customers;
};

const updateProfile = async ({ cpf, ...payload }) => {
  if (!payload) throw new MissingParamError('payload');

  const currentDate = DataHelper.getCurrentDateISOString();
  const dataForUpdate = { ...payload, updatedAt: currentDate };

  const data = await CustomerRepository.updateProfileByPK(CustomerProfileAdapter.inputOne(dataForUpdate));
  const customer = CustomerProfileAdapter.outputOne(data);

  return customer;
};

const deleteProfile = async ({ customerId, status }) => {
  if (!customerId) throw new MissingParamError('customerId');
  if (status && status === 'INACTIVE') return { message: 'CUSTOMER ALREADY INACTIVE' };

  const dataForUpdate = { customerId, status: 'INACTIVE' };
  const data = await updateProfile(dataForUpdate);

  return data;
};

module.exports = {
  createProfile,
  getProfile,
  getProfiles,
  updateProfile,
  deleteProfile
};
