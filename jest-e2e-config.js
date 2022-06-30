const config = require('./jest.config')
config.testMatch = [`${__dirname}/tests/e2e/**`]
config.displayName = 'e2e-tests'
module.exports = config
