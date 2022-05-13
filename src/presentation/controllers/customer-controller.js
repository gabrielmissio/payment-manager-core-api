const { ResponseHelper } = require('../helpers');
const { AuthService, CustomerService } = require('../../domain/services');
const { serialize, serializeList } = require('../serializers/customer-serializer');
const {
  ErrorMessagesEnum: { CUSTOMER_ALREADY_EXISTS, CUSTOMER_NOT_FOUND }
} = require('../../utils/enums');

const createCustomer = async (request) => {
  try {
    const existingCustomer = await CustomerService.getCustomer({ customerId: request.body.cpf });
    if (existingCustomer) return ResponseHelper.conflict(CUSTOMER_ALREADY_EXISTS);

    const newCustomer = await CustomerService.createCustomer({
      ...request.body,
      requestUser: AuthService.getRequestUser(request.headers.authorization.split('Bearer ')[1])
    });

    return ResponseHelper.created(serialize(newCustomer));
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getCustomers = async () => {
  try {
    // TODO: implement filters
    const customers = await CustomerService.getCustomers();

    return ResponseHelper.ok(serializeList(customers));
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const getCustomer = async (request) => {
  try {
    const customer = await CustomerService.getCustomer(request.params);
    if (!customer) return ResponseHelper.notFound(CUSTOMER_NOT_FOUND);

    return ResponseHelper.ok(serialize(customer));
  } catch (error) {
    console.error(error);
    return ResponseHelper.exceptionHandler(error);
  }
};

const updateCustomer = async (request) => {
  try {
    const existingCustomer = await CustomerService.getCustomer(request.params);
    if (!existingCustomer) return ResponseHelper.notFound(CUSTOMER_NOT_FOUND);

    const updatedCustomer = await CustomerService.updateCustomer({
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

const deleteCustomer = async (request) => {
  try {
    const existingCustomer = await CustomerService.getCustomer(request.params);
    if (!existingCustomer) return ResponseHelper.notFound(CUSTOMER_NOT_FOUND);

    const inactiveCustomer = await CustomerService.deleteCustomer({
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
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer
};
