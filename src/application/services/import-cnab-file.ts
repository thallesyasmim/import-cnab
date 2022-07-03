import { ImportCnabFile } from '@/domain/usecases'
import { SaveShopRepository, SaveTransactionRepository } from '../contracts'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ImportCnabFileService implements ImportCnabFile {
  constructor(
    @inject('ShopTypeormRepository')
    private readonly saveShopRepository: SaveShopRepository,
    @inject('TransactionTypeormRepository')
    private readonly saveTransactionRepository: SaveTransactionRepository
  ) {}

  async import(file: any): Promise<void> {}
}
