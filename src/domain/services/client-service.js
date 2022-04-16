const { MissingParamError } = require('../../utils/errors');
const { DataHelper } = require('../../utils/helpers');
const { ClientRepository } = require('../../infra/repositories');
const { ClientProfileAdapter } = require('../../infra/adapters');

const createClient = async (payload) => {
  if (!payload) throw new MissingParamError('payload');

  const currentDate = DataHelper.getCurrentDateISOString();
  const additionalInfo = {
    createdAt: currentDate,
    updatedAt: currentDate,
    status: 'ACTIVE'
  };

  const client = { ...payload, ...additionalInfo, clientId: payload.cpf };
  await ClientRepository.create({ client: ClientProfileAdapter.inputOne(client) });

  return client;
};

const getClientProfile = async ({ clientId }) => {
  if (!clientId) throw new MissingParamError('clientId');

  const data = await ClientRepository.getProfileByPK(ClientProfileAdapter.inputOne({ clientId }));
  const client = ClientProfileAdapter.outputOne(data);

  return client;
};

const getClients = async (filters = { status: 'ACTIVE' }) => {
  const data = await ClientRepository.getProfilesByStatus(filters);
  const clients = ClientProfileAdapter.outputMany(data);

  // TODO: implement pagination
  return clients;
};

const updateClientProfile = async ({ cpf, ...payload }) => {
  if (!payload) throw new MissingParamError('payload');

  const currentDate = DataHelper.getCurrentDateISOString();
  const dataForUpdate = { ...payload, updatedAt: currentDate };

  const data = await ClientRepository.updateProfileByPK(ClientProfileAdapter.inputOne(dataForUpdate));
  const client = ClientProfileAdapter.outputOne(data);

  return client;
};

const deleteClientProfile = async ({ clientId, status }) => {
  if (!clientId) throw new MissingParamError('clientId');
  if (status && status === 'INACTIVE') return { message: 'CLIENT ALREADY INACTIVE' };

  const dataForUpdate = { clientId, status: 'INACTIVE' };
  const data = await updateClientProfile(dataForUpdate);

  return data;
};

module.exports = {
  createClient,
  getClientProfile,
  getClients,
  updateClientProfile,
  deleteClientProfile
};
