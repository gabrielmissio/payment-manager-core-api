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

  const client = { ...payload, ...additionalInfo };
  await ClientRepository.create({ client: ClientProfileAdapter.inputOne(client) });

  return client;
};

const getClientProfile = async ({ clientId }) => {
  if (!clientId) throw new MissingParamError('clientId');

  const data = await ClientRepository.getProfileByPK(ClientProfileAdapter.inputOne({ cpf: clientId }));
  const client = ClientProfileAdapter.outputOne(data);

  return client;
};

const getClients = async (filters = { status: 'ACTIVE' }) => {
  const data = await ClientRepository.getProfilesByStatus(filters);
  const clients = ClientProfileAdapter.outputMany(data);

  // TODO: implement pagination
  return clients;
};

module.exports = {
  createClient,
  getClientProfile,
  getClients
};
