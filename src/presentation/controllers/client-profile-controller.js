const { ResponseHelper } = require('../helpers');
const { ClientProfileService } = require('../../domain/services');

const createProfile = async (request) => {
  try {
    const existingClient = await ClientProfileService.getProfile({ clientId: request.body.cpf });
    if (existingClient) return ResponseHelper.conflict('CLIENT ALREADY EXISTS');

    const newClient = await ClientProfileService.createProfile(request.body);

    return ResponseHelper.created(newClient);
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getProfiles = async () => {
  try {
    // TODO: implement filters
    const clients = await ClientProfileService.getProfiles();

    return ResponseHelper.ok(clients);
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getProfile = async (request) => {
  try {
    const client = await ClientProfileService.getProfile(request.params);
    if (!client) return ResponseHelper.notFound('CLIENT NOT FOUND');

    return ResponseHelper.ok(client);
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const updateProfile = async (request) => {
  try {
    const existingClient = await ClientProfileService.getProfile(request.params);
    if (!existingClient) return ResponseHelper.notFound('CLIENT NOT FOUND');

    const updatedClient = await ClientProfileService.updateProfile({
      clientId: request.params.clientId,
      ...request.body
    });

    return ResponseHelper.ok(updatedClient);
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const deleteProfile = async (request) => {
  try {
    const existingClient = await ClientProfileService.getProfile(request.params);
    if (!existingClient) return ResponseHelper.notFound('CLIENT NOT FOUND');

    const inactiveClient = await ClientProfileService.deleteProfile(existingClient);

    return ResponseHelper.ok(inactiveClient); // TODO: replace ok with notContent
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

module.exports = {
  createProfile,
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile
};
