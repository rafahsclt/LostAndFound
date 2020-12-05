import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createItems1607191445538 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'items',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'telephone',
                    type: 'varchar'
                },
                {
                    name: 'object',
                    type: 'varchar'
                },
                {
                    name: 'lostOrFound',
                    type: 'varchar'
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                },
                {
                    name: 'observations',
                    type: 'text'
                },
                {
                    name: 'category_id',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'CategoryItem',
                    columnNames: ['category_id'],
                    referencedTableName: 'categories',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('items')
    }


}
