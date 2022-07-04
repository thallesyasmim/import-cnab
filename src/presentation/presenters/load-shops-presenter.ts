import { Shop } from '@/domain/models'
import { LoadShops } from '@/domain/usecases'
import { inject, injectable } from 'tsyringe'
import { noContent, ok, serverError } from '../helpers'
import { Gateway, HttpResponse } from '../protocols'

@injectable()
export class LoadShopsPresenter implements Gateway {
  constructor(
    @inject('LoadShopsService')
    private readonly loadShops: LoadShops
  ) {}

  async handle(_: LoadShopsPresenter.Request): Promise<LoadShopsPresenter.Result> {
    try {
      const shopsResult = await this.loadShops.load()

      if (shopsResult.isLeft()) return noContent()

      return ok({
        shops: shopsResult.value.map(({ data }) => data)
      })
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}

export namespace LoadShopsPresenter {
  export type Request = any
  export type Result = HttpResponse<Shop[]>
}
