const router = require('express').Router();

const { CustomerController, PaymentController, PlanController } = require('../../presentation/controllers');
const {
  ExpressRouterAdapter: { adapt }
} = require('../adapters');

module.exports = (app) => {
  app.use('/', router);

  router.post('/customer', adapt(CustomerController.createProfile));
  router.get('/customer', adapt(CustomerController.getProfiles));
  router.get('/customer/:customerId', adapt(CustomerController.getProfile));
  router.put('/customer/:customerId', adapt(CustomerController.updateProfile));
  router.delete('/customer/:customerId', adapt(CustomerController.deleteProfile));

  router.post('/customer/:customerId/payments', adapt(PaymentController.createPayment));
  router.get('/customer/:customerId/payments', adapt(PaymentController.getPayments));

  router.post('/plan', adapt(PlanController.createPlan));
  router.get('/plan', adapt(PlanController.getPlans));
  router.get('/plan/:planId', adapt(PlanController.getPlan));
  router.put('/plan/:planId', adapt(PlanController.updatePlan));
  router.delete('/plan/:planId', adapt(PlanController.deletePlan));
};
