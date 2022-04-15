const router = require('express').Router();

module.exports = (app) => {
  app.use('/', router);

  router.post('/client', (req, res) => res.status(200).json({ message: '(POST) - /client' }));
  router.get('/client', (req, res) => res.status(200).json({ message: '(GET) - /client' }));
  router.get('/client/:clientId/profile', (req, res) =>
    res.status(200).json({ message: '(GET) - /client/:client/profile' })
  );
  router.get('/client/:clientId/payments', (req, res) =>
    res.status(200).json({ message: '(GET) - /client/:client/payment' })
  );
  router.put('/client/:clientId/profile', (req, res) =>
    res.status(200).json({ message: '(PUT) - /client/:client/profile' })
  );
  router.delete('/client/:clientId/profile', (req, res) =>
    res.status(200).json({ message: '(DELETE) - /client/:client/profile' })
  );
};
