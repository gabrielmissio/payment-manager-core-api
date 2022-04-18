const router = require('express').Router();

const { CustomerProfileController, CustomerPaymentsController } = require('../../presentation/controllers');
const {
  ExpressRouterAdapter: { adapt }
} = require('../adapters');

module.exports = (app) => {
  app.use('/', router);

  router.post('/customer', adapt(CustomerProfileController.createProfile));
  router.get('/customer', adapt(CustomerProfileController.getProfiles));
  router.get('/customer/:customerId/profile', adapt(CustomerProfileController.getProfile));
  router.put('/customer/:customerId/profile', adapt(CustomerProfileController.updateProfile));
  router.delete('/customer/:customerId/profile', adapt(CustomerProfileController.deleteProfile));

  router.get('/customer/:customerId/payments', adapt(CustomerPaymentsController.getPayments));
};
