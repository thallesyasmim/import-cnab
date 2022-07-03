import { Gateway } from '@/presentation/protocols'
import { Router } from 'express'
import { container } from 'tsyringe'
import { adaptRoute } from '../adapters'

export default (router: Router): void => {
  const uploadCnabFilePresenter: Gateway = container.resolve('UploadCnabFilePresenter')
  router.post('/cnab/upload', adaptRoute(uploadCnabFilePresenter))
}
