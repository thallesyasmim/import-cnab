import fs from 'fs'
import { promisify } from 'util'
import { randomUUID } from 'crypto'

import { ImportCnabFile } from '@/domain/usecases'
import { Cnab, SaveShopRepository, SaveTransactionRepository } from '../contracts'
import { Shop, Transaction } from '@/domain/models'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ImportCnabFileService implements ImportCnabFile {
  constructor(
    @inject('CnabHelper')
    private readonly cnabHelper: Cnab,
    @inject('ShopTypeormRepository')
    private readonly saveShopRepository: SaveShopRepository,
    @inject('TransactionTypeormRepository')
    private readonly saveTransactionRepository: SaveTransactionRepository
  ) {}

  async import(file: ImportCnabFileService.Params): Promise<void> {
    const readFileAsync = promisify(fs.readFile)
    const data = await readFileAsync(file.path)
    const transactions = data
      .toString()
      .split('\n')
      .filter(register => register)
      .map(register => this.cnabHelper.normalize(register.trim()))

    for (const transaction of transactions) {
      const shopResult = Shop.create(
        {
          name: transaction?.shop,
          owner: transaction?.owner
        },
        randomUUID()
      )

      if (shopResult.isLeft()) throw new Error()

      const shop = await this.saveShopRepository.save(shopResult.value)

      const transactionResult = Transaction.create(
        {
          typeId: transaction?.type,
          shopId: shop?.id,
          card: transaction?.card,
          cpf: transaction?.cpf,
          date: transaction?.date,
          value: transaction?.value
        },
        randomUUID()
      )

      if (transactionResult.isLeft()) throw new Error()

      await this.saveTransactionRepository.save(transactionResult.value)
    }
  }
}

export namespace ImportCnabFileService {
  export type Params = {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
  }
}
