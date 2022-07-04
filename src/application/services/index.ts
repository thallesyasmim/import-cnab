import { ImportCnabFile, LoadShops } from '@/domain/usecases'
import { LoadShopsService } from './load-shops'
import { ImportCnabFileService } from './import-cnab-file'
import { container } from 'tsyringe'

container.register<LoadShops>('LoadShopsService', {
  useClass: LoadShopsService
})

container.register<ImportCnabFile>('ImportCnabFileService', {
  useClass: ImportCnabFileService
})

export * from './load-shops'
export * from './import-cnab-file'
