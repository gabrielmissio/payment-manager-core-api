const config = require('./jest.config');

config.testMatch = ['**/__tests__/unit/**/*.spec.js', '**/__tests__/unit/**/*.test.js'];
module.exports = config;
