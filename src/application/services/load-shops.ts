import { Shop } from '@/domain/models'
import { LoadShops } from '@/domain/usecases'
import { Either, right, left } from '@/shared/either'
import { inject, injectable } from 'tsyringe'
import { LoadShopsRepository } from '../contracts'

@injectable()
export class LoadShopsService implements LoadShops {
  constructor(
    @inject('ShopTypeormRepository')
    private readonly loadShopsRepository: LoadShopsRepository
  ) {}

  async load(): Promise<Either<null, Shop[]>> {
    const shops = await this.loadShopsRepository.load()
    return shops ? right(shops) : left(null)
  }
}
