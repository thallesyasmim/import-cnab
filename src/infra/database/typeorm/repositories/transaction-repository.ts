import { SaveTransactionRepository } from '@/application/contracts'
import { Transaction } from '@/domain/models'
import { Repository } from 'typeorm'
import { TransactionModel } from '../models'
import { PgHelper } from '../pg-helper'

/**
 * TransactionTypeormRepository is the real implementation for the transaction's repositories interfaces.
 * The [TypeORM]{@link https://typeorm.io/} is being used in the communication with Postgres.
 */
export class TransactionTypeormRepository implements SaveTransactionRepository {
  private repository: Repository<TransactionModel>

  constructor() {
    this.repository = PgHelper.getInstance().getRepository<TransactionModel>(TransactionModel)
  }

  /**
   * Create method is implemented from SaveTransactionRepository.
   * @param data Transaction credentials
   */
  async save(data: Transaction): Promise<void> {
    const Transaction = this.repository.create(data)
    await this.repository.save(Transaction)
  }
}
