import {
  LoadShopsRepository,
  SaveShopRepository,
  SaveTransactionRepository
} from '@/application/contracts'
import { ShopTypeormRepository } from './shop-repository'
import { TransactionTypeormRepository } from './transaction-repository'
import { container } from 'tsyringe'

container.register<LoadShopsRepository & SaveShopRepository>('ShopTypeormRepository', {
  useClass: ShopTypeormRepository
})

container.register<SaveTransactionRepository>('TransactionTypeormRepository', {
  useClass: TransactionTypeormRepository
})

export * from './shop-repository'
export * from './transaction-repository'
