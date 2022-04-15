const serverless = require('serverless-http');

const app = require('./src/main/config/app');

module.exports.handler = serverless(app);
