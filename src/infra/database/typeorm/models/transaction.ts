import { TransactionData } from '@/domain/models'
import { ShopModel } from './shop'
import { TransactionTypeModel } from '@/infra/database/typeorm/models'
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne
} from 'typeorm'

@Entity({ name: 'transactions' })
export class TransactionModel implements TransactionData {
  @PrimaryColumn('uuid')
  public id: string

  @Column()
  public date: Date

  @Column()
  public value: number

  @Column()
  public cpf: string

  @Column()
  public card: string

  @Column({ name: 'type_id' })
  public typeId: string

  @JoinColumn({ name: 'type_id' })
  @OneToOne(() => TransactionTypeModel)
  type: TransactionTypeModel

  @Column({ name: 'shop_id' })
  public shopId: string

  @JoinColumn({ name: 'shop_id' })
  @ManyToOne(() => ShopModel)
  shop: ShopModel

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date
}
