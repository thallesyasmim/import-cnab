import { ShopData } from '@/domain/models'
import { TransactionModel } from '@/infra/database/typeorm/models'
import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from 'typeorm'

@Entity({ name: 'shops' })
export class ShopModel implements ShopData {
  @PrimaryColumn('uuid')
  public id: string

  @Column()
  public name: string

  @Column()
  public owner: string

  @OneToMany(() => TransactionModel, transaction => transaction.shop)
  transactions: TransactionModel[]

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date
}
