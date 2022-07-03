import 'dotenv/config'
import { DataSource } from 'typeorm'

export const pgDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: false,
  synchronize: false,
  name: 'default',
  ...(process.env.NODE_ENV === 'production' && { ssl: { rejectUnauthorized: false } }),
  entities: [
    `./${
      process.env.NODE_ENV === 'production' ? 'dist' : 'src'
    }/infra/database/typeorm/models/*.{js,ts}`
  ],
  migrations: [
    `./${
      process.env.NODE_ENV === 'production' ? 'dist' : 'src'
    }/infra/database/typeorm/migrations/*.{js,ts}`
  ]
})
