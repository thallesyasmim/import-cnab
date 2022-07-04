import { Either, left, right } from '@/shared/either'
import { Entity } from '@/shared/entity'
import { Name } from '@/domain/value-objects'
import { InvalidNameError } from '../errors'
import { TransactionModel } from '@/infra/database/typeorm/models'

export interface ShopData {
  name: string
  owner: string
  transactions?: TransactionModel[]
}

export type ShopErrors = InvalidNameError

export class Shop extends Entity<ShopData> {
  private constructor(data: ShopData, id: string) {
    super(data, id)
  }

  get id(): string {
    return this._id as string
  }

  get name() {
    return this.data.name
  }

  get owner() {
    return this.data.owner
  }

  get transactions() {
    return this.data?.transactions ?? []
  }

  get createdAt(): Date {
    return this._createdAt
  }

  static create(data: ShopData, id: string): Either<ShopErrors, Shop> {
    const nameResult = Name.create(data.name)
    if (nameResult.isLeft()) return left(nameResult.value)

    const shop = new Shop(data, id)
    return right(shop)
  }

  static adapt({ id, ...data }: ShopData & { id: string }): Shop {
    return new Shop(data, id)
  }
}
