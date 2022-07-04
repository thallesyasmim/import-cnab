import { Either, left, right } from '@/shared/either'
import { Entity } from '@/shared/entity'
import { Cpf } from '@/domain/value-objects'
import { InvalidCpfError, InvalidCardError } from '@/domain/errors'
import { Card } from '@/domain/value-objects/'
import { TransactionTypeModel } from '@/infra/database/typeorm/models'

export interface TransactionData {
  typeId: number
  shopId: string
  date: Date
  value: number
  cpf: string
  card: string
  type?: TransactionTypeModel
}

export type TransactionErrors = InvalidCpfError | InvalidCardError

export class Transaction extends Entity<TransactionData> {
  private constructor(data: TransactionData, id: string) {
    super(data, id)
  }

  get id(): string {
    return this._id as string
  }

  get typeId(): number {
    return this.data.typeId
  }

  get shopId(): string {
    return this.data.shopId
  }

  get date(): Date {
    return this.data.date
  }

  get value(): number {
    return this.data.value
  }

  get cpf(): string {
    return this.data.cpf.replace(/\D/g, '')
  }

  get card(): string {
    return this.data.card
  }

  get createdAt(): Date {
    return this._createdAt
  }

  static create(data: TransactionData, id: string): Either<TransactionErrors, Transaction> {
    const cpfResult = Cpf.create(data.cpf)
    if (cpfResult.isLeft()) return left(cpfResult.value)

    const cardResult = Card.create(data.card)
    if (cardResult.isLeft()) return left(cardResult.value)

    const transaction = new Transaction(data, id)
    return right(transaction)
  }

  static adapt({ id, ...data }: TransactionData & { id: string }): Transaction {
    return new Transaction(data, id)
  }
}
