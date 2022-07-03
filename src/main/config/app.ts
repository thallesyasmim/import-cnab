import setupRoutes from '@/main/config/routes'
import setupMiddlewares from '@/main/config/middlewares'
import express, { Express } from 'express'

export const setupApp = (): Express => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
