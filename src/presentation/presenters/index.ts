import { container } from 'tsyringe'
import { Gateway } from '../protocols'
import { LoadShopsPresenter } from './load-shops-presenter'
import { UploadCnabFilePresenter } from './upload-cnab-file'

container.register<Gateway>('LoadShopsPresenter', {
  useClass: LoadShopsPresenter
})

container.register<Gateway>('UploadCnabFilePresenter', {
  useClass: UploadCnabFilePresenter
})

export * from './load-shops-presenter'
export * from './upload-cnab-file'
