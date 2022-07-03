import { DataSource, DataSourceOptions, ObjectType, Repository } from 'typeorm'
import ormconfig from '../../../../ormconfig'

export class ConnectionNotFoundError extends Error {
  constructor() {
    super('No PostgreSQL connection was found')
    this.name = this.constructor.name
  }
}

export class PgHelper {
  private static instance?: PgHelper
  private connection?: DataSource

  private constructor() {}

  static getInstance(): PgHelper {
    if (!PgHelper.instance) PgHelper.instance = new PgHelper()
    return PgHelper.instance
  }

  async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = new DataSource(ormconfig as unknown as DataSourceOptions)
    }
  }

  async disconnect(): Promise<void> {
    if (!this.connection) throw new ConnectionNotFoundError()
    await this.connection.destroy()
    this.connection = null
  }

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    if (!this.connection) throw new ConnectionNotFoundError()
    return this.connection.getRepository(entity)
  }
}
