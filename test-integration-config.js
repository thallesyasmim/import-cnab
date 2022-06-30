const config = require('./jest.config')
config.testMatch = [`${__dirname}/tests/**/*.test.ts`]
config.displayName = 'integration-tests'
module.exports = config
