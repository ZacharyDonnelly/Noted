const baseConfig = require('./tests/jest.config.base')

module.exports = {
  ...baseConfig,
  testPathIgnorePatterns: [...baseConfig.testPathIgnorePatterns, '<rootDir>/themes', '<rootDir>/examples']
}
