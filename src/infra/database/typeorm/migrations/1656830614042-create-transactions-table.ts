import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createTransactionsTable1656830614042 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'type_id',
            type: 'int',
            isNullable: false
          },
          {
            name: 'shop_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'date',
            type: 'date',
            isNullable: false
          },
          {
            name: 'value',
            type: 'decimal',
            isNullable: false
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'card',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }),
      true
    )

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'fk_type',
        referencedTableName: 'transaction-types',
        referencedColumnNames: ['id'],
        columnNames: ['type_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      })
    )

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'fk_shop',
        referencedTableName: 'shops',
        referencedColumnNames: ['id'],
        columnNames: ['shop_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'fk_type')
    await queryRunner.dropForeignKey('transactions', 'fk_shop')
    await queryRunner.dropTable('transactions', true)
  }
}
