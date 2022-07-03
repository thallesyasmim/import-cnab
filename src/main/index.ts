import 'reflect-metadata'
import { PgHelper } from '@/infra/database/typeorm/pg-helper'
import env from '@/main/config/env'
;(async () => {
  await PgHelper.getInstance().connect()
  const { setupApp } = await import('./config/app')
  const app = await setupApp()
  app.listen(env.PORT, () => console.log(`Server running at http://localhost:${env.PORT}`))
})()
