import { Either } from '@/shared/either'
import { Transaction } from '../models'

export interface CountTotalBalanceShop {
  count(transactions: Transaction[]): Promise<Either<null, number>>
}
