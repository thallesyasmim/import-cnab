import { Transaction } from '@/domain/models'

export interface SaveTransactionRepository {
  save(data: Transaction): Promise<void>
}
