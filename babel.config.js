module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@/application': './src/application',
          '@/domain': './src/domain',
          '@/infra': './src/infra',
          '@/presentation': './src/presentation',
          '@/main': './src/main',
          '@/shared': './src/shared'
        }
      }
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ],
  ignore: ['**/tests']
}
