import { Either, left, right } from '@/shared/either'
import { Entity } from '@/shared/entity'
import { InvalidNameError } from '../errors'
import { Name } from '@/domain/value-objects'

export interface ShopData {
  name: string
  owner: string
}

export type ShopErrors = InvalidNameError

export class Shop extends Entity<ShopData> {
  private constructor(data: ShopData, id: string) {
    super(data, id)
  }

  get id(): string {
    return this._id
  }

  get name() {
    return this.data.name
  }

  get owner() {
    return this.data.owner
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
