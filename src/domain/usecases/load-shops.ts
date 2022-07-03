import { Either } from '@/shared/either'
import { Shop } from '@/domain/models'

export interface LoadShops {
  load(): Promise<Either<null, Shop[]>>
}
