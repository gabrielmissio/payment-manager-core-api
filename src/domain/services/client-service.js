const { MissingParamError } = require('../../utils/errors');
const { DataHelper } = require('../../utils/helpers');
const { ClientRepository } = require('../../infra/repositories');
const { ClientProfileAdapter } = require('../../infra/adapters');

const createClient = async (data) => {
  if (!data) throw new MissingParamError('data');

  const currentDate = DataHelper.getCurrentDateISOString();
  const additionalInfo = {
    createdAt: currentDate,
    updatedAt: currentDate,
    status: 'ACTIVE'
  };

  const client = { ...data, ...additionalInfo };
  await ClientRepository.create({ client: ClientProfileAdapter.inputOne(client) });

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
  getClients
};
