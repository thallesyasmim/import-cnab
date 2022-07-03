import { Shop } from '@/domain/models'

export interface LoadShopsRepository {
  load(): Promise<LoadShopsRepository.Result>
}

export namespace LoadShopsRepository {
  export type Result = Shop[] | null
}
