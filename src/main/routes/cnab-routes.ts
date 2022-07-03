import { Gateway } from '@/presentation/protocols'
import { adaptRoute } from '../adapters'

import { Router } from 'express'
import { container } from 'tsyringe'
import '@/main/factories/general-factory'

export default (router: Router): void => {
  const uploadCnabFilePresenter: Gateway = container.resolve('UploadCnabFilePresenter')
  router.post('/cnab/upload', adaptRoute(uploadCnabFilePresenter))
}
