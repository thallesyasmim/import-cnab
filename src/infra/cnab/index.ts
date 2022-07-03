import { Cnab } from '@/application/contracts'
import { CnabHelper } from './cnab-helper'
import { container } from 'tsyringe'

container.register<Cnab>('CnabHelper', {
  useClass: CnabHelper
})

export * from './cnab-helper'
