import { Gateway } from '@/presentation/protocols'
import { adaptRoute } from '../adapters'

import { Router } from 'express'
import { container } from 'tsyringe'
import '@/main/factories/general-factory'

export default (router: Router): void => {
  const loadShopsPresenter: Gateway = container.resolve('LoadShopsPresenter')
  router.get('/shops', adaptRoute(loadShopsPresenter))
}
