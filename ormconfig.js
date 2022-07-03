module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === 'production' && { ssl: { rejectUnauthorized: false } }),
  synchronize: false,
  logging: false,
  migrations: [
    __dirname +
      `/${
        process.env.NODE_ENV === 'production' ? 'dist' : 'src'
      }/infra/database/typeorm/migrations/*.{js,ts}`
  ],
  entities: [
    // './dist/infra/database/models/account.js',
    `${
      process.env.NODE_ENV === 'production' ? 'dist' : 'src'
    }/infra/database/typeorm/models/*.{js,ts}`
  ],
  cli: {
    migrationsDir: './src/infra/database/typeorm/migrations/',
    entitiesDir: './src/infra/database/typeorm/models/'
  }
}
