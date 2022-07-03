import { Shop } from '@/domain/models'

export interface SaveShopRepository {
  save(data: Shop): Promise<void>
}
