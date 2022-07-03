import { container } from 'tsyringe'
import { Gateway } from '../protocols'
import { LoadShopsPresenter } from './load-shops-presenter'

container.register<Gateway>('LoadShopsPresenter', {
  useClass: LoadShopsPresenter
})

export * from './load-shops-presenter'
