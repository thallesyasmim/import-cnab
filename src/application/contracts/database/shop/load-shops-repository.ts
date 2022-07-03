import { Shop } from '@/domain/models'

export interface LoadShopsRepository {
  load(): Promise<Shop[]>
}
