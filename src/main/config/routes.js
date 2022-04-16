const router = require('express').Router();

const { ClientProfileController, ClientPaymentsController } = require('../../presentation/controllers');
const {
  ExpressRouterAdapter: { adapt }
} = require('../adapters');

module.exports = (app) => {
  app.use('/', router);

  router.post('/client', adapt(ClientProfileController.createProfile));
  router.get('/client', adapt(ClientProfileController.getProfiles));
  router.get('/client/:clientId/profile', adapt(ClientProfileController.getProfile));
  router.put('/client/:clientId/profile', adapt(ClientProfileController.updateProfile));
  router.delete('/client/:clientId/profile', adapt(ClientProfileController.deleteProfile));

  router.get('/client/:clientId/payments', adapt(ClientPaymentsController.getPayments));
};
