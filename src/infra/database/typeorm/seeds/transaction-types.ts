import { Seeder } from '@/application/contracts'
import { DataSource } from 'typeorm'
import { TransactionTypeModel } from '../models'

export default class TransactionTypeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(TransactionTypeModel)
    await repository.insert([
      {
        id: 1,
        description: 'Débito',
        signal: '+'
      },
      {
        id: 2,
        description: 'Boleto',
        signal: '-'
      },
      {
        id: 3,
        description: 'Financiamento',
        signal: '-'
      },
      {
        id: 4,
        description: 'Crédito',
        signal: '+'
      },
      {
        id: 5,
        description: 'Recebimento Empréstimo',
        signal: '+'
      },
      {
        id: 6,
        description: 'Vendas',
        signal: '+'
      },
      {
        id: 7,
        description: 'Recebimento TED',
        signal: '+'
      },
      {
        id: 8,
        description: 'Recebimento DOC',
        signal: '+'
      },
      {
        id: 9,
        description: 'Aluguel',
        signal: '-'
      }
    ])
  }
}
