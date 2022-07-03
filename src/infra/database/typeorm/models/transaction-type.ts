import { TransactionTypeData } from '@/domain/models'
import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm'

@Entity({ name: 'transaction-types' })
export class TransactionTypeModel implements TransactionTypeData {
  @PrimaryColumn()
  public id: number

  @Column()
  public description: string

  @Column()
  public signal: string

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date
}
