import { Gateway } from '@/presentation/protocols'
import { adaptRoute } from '../adapters'

import { Router } from 'express'
import { container } from 'tsyringe'
import multer from 'multer'
import '@/main/factories/general-factory'

export default (router: Router): void => {
  const uploadCnabFilePresenter: Gateway = container.resolve('UploadCnabFilePresenter')
  const upload = multer({ dest: '../../temp/' })

  router.post('/cnab/upload', upload.single('cnab'), adaptRoute(uploadCnabFilePresenter))
}
