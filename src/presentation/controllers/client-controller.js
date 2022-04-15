const { ResponseHelper } = require('../helpers');
const { ClientService } = require('../../domain/services');

const createClient = async (request) => {
  try {
    const existingClient = await ClientService.getClientProfile({ clientId: request.body.cpf });
    if (existingClient) return ResponseHelper.conflict('CLIENT ALREADY EXISTS');

    const newClient = await ClientService.createClient(request.body);

    return ResponseHelper.created(newClient);
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getClients = async () => {
  try {
    // TODO: implement filters
    const clients = await ClientService.getClients();

    return ResponseHelper.ok(clients);
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getClientProfile = async (request) => {
  try {
    const client = await ClientService.getClientProfile(request.params);
    if (!client) return ResponseHelper.notFound('CLIENT NOT FOUND');

    return ResponseHelper.ok(client);
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getClientPayments = async (request) => {
  try {
    return ResponseHelper.ok({ request, message: '(GET) - /client/:client/payment' });
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const updateClientProfile = async (request) => {
  try {
    return ResponseHelper.ok({ request, message: '(PUT) - /client/:client/profile' });
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const deleteClientProfile = async (request) => {
  try {
    return ResponseHelper.ok({ request, message: '(DELETE) - /client/:client/profile' });
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

module.exports = {
  createClient,
  getClients,
  getClientProfile,
  getClientPayments,
  updateClientProfile,
  deleteClientProfile
};
