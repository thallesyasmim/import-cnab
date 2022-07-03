import { Either, left, right } from '@/shared/either'
import { Entity } from '@/shared/entity'
import { InvalidSignalError } from '../errors'
import { Signal } from '@/domain/value-objects'

export interface TransactionTypeData {
  description: string
  signal: string
}

export type TransactionTypeErrors = InvalidSignalError

export class TransactionType extends Entity<TransactionTypeData> {
  private constructor(data: TransactionTypeData, id: string) {
    super(data, id)
  }

  get id(): string {
    return this._id
  }

  get description(): string {
    return this.data.description
  }

  get signal(): string {
    return this.data.signal
  }

  get createdAt(): Date {
    return this._createdAt
  }

  static create(
    data: TransactionTypeData,
    id: string
  ): Either<TransactionTypeErrors, TransactionType> {
    const signalResult = Signal.create(data.signal)
    if (signalResult.isLeft()) return left(signalResult.value)

    const transactionType = new TransactionType(data, id)
    return right(transactionType)
  }

  static adapt({ id, ...data }: TransactionTypeData & { id: string }): TransactionType {
    return new TransactionType(data, id)
  }
}
