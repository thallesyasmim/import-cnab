import { Shop } from '@/domain/models'
import { LoadShops } from '@/domain/usecases'
import { Either, right, left } from '@/shared/either'
import { LoadShopsRepository } from '../contracts'

export class LoadShopsService implements LoadShops {
  constructor(private readonly loadShopsRepository: LoadShopsRepository) {}

  async load(): Promise<Either<null, Shop[]>> {
    const shops = await this.loadShopsRepository.load()
    return shops ? right(shops) : left(null)
  }
}
