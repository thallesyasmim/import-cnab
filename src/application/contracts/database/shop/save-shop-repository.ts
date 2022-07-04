import { Shop } from '@/domain/models'
import { ShopModel } from '@/infra/database/typeorm/models'

export interface SaveShopRepository {
  save(data: Shop): Promise<ShopModel>
}
