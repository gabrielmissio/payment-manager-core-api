const { ResponseHelper } = require('../helpers');
const { CustomerProfileService } = require('../../domain/services');

const createProfile = async (request) => {
  try {
    const existingCustomer = await CustomerProfileService.getProfile({ customerId: request.body.cpf });
    if (existingCustomer) return ResponseHelper.conflict('CLIENT ALREADY EXISTS');

    const newCustomer = await CustomerProfileService.createProfile(request.body);

    return ResponseHelper.created(newCustomer);
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getProfiles = async () => {
  try {
    // TODO: implement filters
    const customers = await CustomerProfileService.getProfiles();

    return ResponseHelper.ok(customers);
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getProfile = async (request) => {
  try {
    const customer = await CustomerProfileService.getProfile(request.params);
    if (!customer) return ResponseHelper.notFound('CLIENT NOT FOUND');

    return ResponseHelper.ok(customer);
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const updateProfile = async (request) => {
  try {
    const existingCustomer = await CustomerProfileService.getProfile(request.params);
    if (!existingCustomer) return ResponseHelper.notFound('CLIENT NOT FOUND');

    const updatedCustomer = await CustomerProfileService.updateProfile({
      customerId: request.params.customerId,
      ...request.body
    });

    return ResponseHelper.ok(updatedCustomer);
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const deleteProfile = async (request) => {
  try {
    const existingCustomer = await CustomerProfileService.getProfile(request.params);
    if (!existingCustomer) return ResponseHelper.notFound('CLIENT NOT FOUND');

    const inactiveCustomer = await CustomerProfileService.deleteProfile(existingCustomer);

    return ResponseHelper.ok(inactiveCustomer); // TODO: replace ok with notContent
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
