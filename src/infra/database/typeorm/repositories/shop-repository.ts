import { LoadShopsRepository, SaveShopRepository } from '@/application/contracts'
import { Shop } from '@/domain/models'
import { ShopModel } from '../models'
import { PgHelper } from '../pg-helper'

import { Repository } from 'typeorm'
import { injectable } from 'tsyringe'

/**
 * ShopTypeormRepository is the real implementation for the shops's repositories interfaces.
 * The [TypeORM]{@link https://typeorm.io/} is being used in the communication with Postgres.
 */
@injectable()
export class ShopTypeormRepository implements LoadShopsRepository, SaveShopRepository {
  private repository: Repository<ShopModel>

  constructor() {
    this.repository = PgHelper.getInstance().getRepository<ShopModel>(ShopModel)
  }

  /**
   * Create method is implemented from SaveShopRepository.
   * @param data Shop credentials
   */
  async save(data: Shop): Promise<ShopModel> {
    const shop = this.repository.create(data)

    const shopIfExists = await this.repository.findOneBy({
      name: shop.name
    })

    if (shopIfExists) {
      return shopIfExists
    }

    await this.repository.save(shop)
    return shop
  }

  /**
   * Implemented from LoadShopsRepository. It returns all register from the db with relations
   */
  async load(): Promise<LoadShopsRepository.Result> {
    const shops = await this.repository.find({
      relations: {
        transactions: true
      }
    })

    return shops.length ? shops.map(shop => Shop.adapt(shop)) : null
  }
}
