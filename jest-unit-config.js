const config = require('./jest.config')
config.testMatch = [`${__dirname}/tests/**/*.spec.ts`]
config.displayName = 'unit-tests'
module.exports = config
