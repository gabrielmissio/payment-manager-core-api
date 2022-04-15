const router = require('express').Router();

const { ClientController } = require('../../presentation/controllers');
const {
  ExpressRouterAdapter: { adapt }
} = require('../adapters');

module.exports = (app) => {
  app.use('/', router);

  router.post('/client', adapt(ClientController.createClient));
  router.get('/client', adapt(ClientController.getClients));
  router.get('/client/:clientId/profile', adapt(ClientController.getClientProfile));
  router.get('/client/:clientId/payments', adapt(ClientController.getClientPayments));
  router.put('/client/:clientId/profile', adapt(ClientController.updateClientProfile));
  router.delete('/client/:clientId/profile', adapt(ClientController.deleteClientProfile));
};
