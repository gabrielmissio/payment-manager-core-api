const router = require('express').Router();

const {
  CustomerProfileController,
  CustomerPaymentsController,
  PlanController
} = require('../../presentation/controllers');
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

  router.post('/customer/:customerId/payments', adapt(CustomerPaymentsController.createPayment));
  router.get('/customer/:customerId/payments', adapt(CustomerPaymentsController.getPayments));

  router.post('/plan', adapt(PlanController.createPlan));
  router.get('/plan', adapt(PlanController.getPlans));
  router.get('/plan/:planId', adapt(PlanController.getPlan));
  router.put('/plan/:planId', adapt(PlanController.updatePlan));
  router.delete('/plan/:planId', adapt(PlanController.deletePlan));
};
