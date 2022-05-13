const router = require('express').Router();

const { CustomerController, PaymentController, PlanController } = require('../../presentation/controllers');
const {
  ExpressRouterAdapter: { adapt }
} = require('../adapters');

module.exports = (app) => {
  app.use('/', router);

  router.post('/customer', adapt(CustomerController.createCustomer));
  router.get('/customer', adapt(CustomerController.getCustomers));
  router.get('/customer/:customerId', adapt(CustomerController.getCustomer));
  router.put('/customer/:customerId', adapt(CustomerController.updateCustomer));
  router.delete('/customer/:customerId', adapt(CustomerController.deleteCustomer));

  router.post('/customer/:customerId/payments', adapt(PaymentController.createPayment));
  router.get('/customer/:customerId/payments', adapt(PaymentController.getPayments));

  router.post('/plan', adapt(PlanController.createPlan));
  router.get('/plan', adapt(PlanController.getPlans));
  router.get('/plan/:planId', adapt(PlanController.getPlan));
  router.put('/plan/:planId', adapt(PlanController.updatePlan));
  router.delete('/plan/:planId', adapt(PlanController.deletePlan));
};
