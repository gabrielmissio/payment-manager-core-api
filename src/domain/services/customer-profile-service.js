const { MissingParamError } = require('../../utils/errors');
const { DataHelper } = require('../../utils/helpers');
const { CustomerRepository } = require('../../infra/repositories');

const createProfile = async (payload) => {
  if (!payload) throw new MissingParamError('payload');

  const currentDate = DataHelper.getCurrentDateISOString();
  const additionalInfo = {
    createdAt: currentDate,
    updatedAt: currentDate,
    status: 'ACTIVE'
  };

  const customer = { ...payload, ...additionalInfo, customerId: payload.cpf };
  await CustomerRepository.create(customer);

  return customer;
};

const getProfile = async ({ customerId }) => {
  if (!customerId) throw new MissingParamError('customerId');

  const customer = await CustomerRepository.getProfileById({ customerId });
  return customer;
};

const getProfiles = async (filters = { status: 'ACTIVE' }) => {
  const customers = await CustomerRepository.getProfilesByStatus(filters);

  // TODO: implement pagination
  return customers;
};

const updateProfile = async ({ cpf, ...payload }) => {
  if (!payload) throw new MissingParamError('payload');

  const currentDate = DataHelper.getCurrentDateISOString();
  const dataForUpdate = { ...payload, updatedAt: currentDate };

  const customer = await CustomerRepository.updateProfileById(dataForUpdate);
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
