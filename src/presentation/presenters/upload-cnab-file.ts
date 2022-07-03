import { ImportCnabFile } from '@/domain/usecases'
import { inject, injectable } from 'tsyringe'
import { noContent, serverError } from '../helpers'
import { Gateway, HttpResponse } from '../protocols'

@injectable()
export class UploadCnabFilePresenter implements Gateway {
  constructor(
    @inject('ImportCnabFileService')
    private readonly importCnabFile: ImportCnabFile
  ) {}

  async handle(request: UploadCnabFilePresenter.Request): Promise<UploadCnabFilePresenter.Result> {
    try {
      await this.importCnabFile.import(request.file)
      return noContent()
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}

export namespace UploadCnabFilePresenter {
  export type Request = {
    file: any
  }

  export type Result = HttpResponse<null>
}
