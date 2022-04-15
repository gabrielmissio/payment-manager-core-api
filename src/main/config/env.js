const REGION = process.env.REGION || 'localhost';

module.exports = {
  REGION,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  DYNAMODB_ENDPOINT: (REGION === 'localhost' && 'http://localhost:8000') || null,
  PAYMENT_MANAGER_TABLE_NAME: process.env.PAYMENT_MANAGER_TABLE_NAME || 'payment-manager'
};
