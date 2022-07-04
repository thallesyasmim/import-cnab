import { pgDataSource } from '@/infra/database/typeorm/data-sources'
import TransactionTypeSeeder from './transaction-types'
;(async () => {
  await pgDataSource.initialize()
  await new TransactionTypeSeeder().run(pgDataSource)
})()
