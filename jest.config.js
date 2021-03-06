module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.spec.js', '**/__tests__/**/*.test.js'],
  collectCoverageFrom: ['**/src/**/*.js'],
  testPathIgnorePatterns: ['/node_modules/']
};
