const { ResponseHelper } = require('../helpers');
const { AuthService, CustomerProfileService } = require('../../domain/services');
const { serialize, serializeList } = require('../serializers/customer-profile-serializer');
const {
  ErrorMessagesEnum: { CUSTOMER_ALREADY_EXISTS, CUSTOMER_NOT_FOUND }
} = require('../../utils/enums');

const createProfile = async (request) => {
  try {
    const existingCustomer = await CustomerProfileService.getProfile({ customerId: request.body.cpf });
    if (existingCustomer) return ResponseHelper.conflict(CUSTOMER_ALREADY_EXISTS);

    const newCustomer = await CustomerProfileService.createProfile({
      ...request.body,
      requestUser: AuthService.getRequestUser(request.headers.authorization.split('Bearer ')[1])
    });

    return ResponseHelper.created(serialize(newCustomer));
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getProfiles = async () => {
  try {
    // TODO: implement filters
    const customers = await CustomerProfileService.getProfiles();

    return ResponseHelper.ok(serializeList(customers));
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getProfile = async (request) => {
  try {
    const customer = await CustomerProfileService.getProfile(request.params);
    if (!customer) return ResponseHelper.notFound(CUSTOMER_NOT_FOUND);

    return ResponseHelper.ok(serialize(customer));
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const updateProfile = async (request) => {
  try {
    const existingCustomer = await CustomerProfileService.getProfile(request.params);
    if (!existingCustomer) return ResponseHelper.notFound(CUSTOMER_NOT_FOUND);

    const updatedCustomer = await CustomerProfileService.updateProfile({
      ...request.body,
      customerId: request.params.customerId,
      requestUser: AuthService.getRequestUser(request.headers.authorization.split('Bearer ')[1])
    });

    return ResponseHelper.ok(serialize(updatedCustomer));
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const deleteProfile = async (request) => {
  try {
    const existingCustomer = await CustomerProfileService.getProfile(request.params);
    if (!existingCustomer) return ResponseHelper.notFound(CUSTOMER_NOT_FOUND);

    const inactiveCustomer = await CustomerProfileService.deleteProfile({
      ...existingCustomer,
      requestUser: AuthService.getRequestUser(request.headers.authorization.split('Bearer ')[1])
    });

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
