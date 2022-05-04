const { MissingParamError } = require('../../utils/errors');
const { DataHelper } = require('../../utils/helpers');
const { CustomerRepository } = require('../../infra/repositories');
const {
  CustomerStatusEnum: { ACTIVE, INACTIVE }
} = require('../../utils/enums');

const createProfile = async ({ requestUser, ...payload }) => {
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

const updateProfile = async ({ requestUser, cpf, ...payload }) => {
  if (!requestUser) throw new MissingParamError('requestUser');
  if (!payload) throw new MissingParamError('payload');

  const currentDate = DataHelper.getCurrentDateISOString();
  const dataForUpdate = { ...payload, updatedAt: currentDate, lastUpdateBy: requestUser.username };

  const customer = await CustomerRepository.updateProfileById(dataForUpdate);
  return customer;
};

const deleteProfile = async ({ requestUser, customerId, status }) => {
  if (!customerId) throw new MissingParamError('customerId');
  if (status && status === INACTIVE) return { message: 'CUSTOMER ALREADY INACTIVE' };

  const dataForUpdate = { requestUser, customerId, status: INACTIVE };
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
