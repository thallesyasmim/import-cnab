import { Shop, SignalEnum } from '@/domain/models'
import { LoadShops } from '@/domain/usecases'
import { Either, right, left } from '@/shared/either'
import { inject, injectable } from 'tsyringe'
import { LoadShopsRepository } from '../contracts'

@injectable()
export class LoadShopsService implements LoadShops {
  constructor(
    @inject('ShopTypeormRepository')
    private readonly loadShopsRepository: LoadShopsRepository
  ) {}

  async load(): Promise<Either<null, Shop[]>> {
    const shops = await this.loadShopsRepository.load()

    const shopsWithTransactions: Shop[] = shops.map(({ id, name, owner, transactions }) => {
      const positiveTransactions = transactions
        .filter(({ type }) => type.signal === SignalEnum.PLUS)
        .map(({ value, ...transaction }) => ({ ...transaction, value: Number(value) }))
        .reduce((previousValue, { value }) => previousValue + value, 0)

      const negativeTransactions = transactions
        .filter(({ type }) => type.signal === SignalEnum.MINUS)
        .map(({ value, ...transaction }) => ({ ...transaction, value: Number(value) }))
        .reduce((previousValue, { value }) => previousValue + value, 0)

      return Shop.adapt({
        id,
        name,
        owner,
        transactions,
        totalBalance: Math.floor(positiveTransactions - negativeTransactions)
      })
    })

    return shopsWithTransactions ? right(shopsWithTransactions) : left(null)
  }
}
