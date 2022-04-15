const { ResponseHelper } = require('../helpers');

const createClient = (request) => {
  try {
    return ResponseHelper.created({ request, message: '(POST) - /client' });
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getClients = (request) => {
  try {
    return ResponseHelper.ok({ request, message: '(GET) - /client' });
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getClientProfile = (request) => {
  try {
    return ResponseHelper.ok({ request, message: '(GET) - /client/:client/profile' });
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getClientPayments = (request) => {
  try {
    return ResponseHelper.ok({ request, message: '(GET) - /client/:client/payment' });
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const updateClientProfile = (request) => {
  try {
    return ResponseHelper.ok({ request, message: '(PUT) - /client/:client/profile' });
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const deleteClientProfile = (request) => {
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
