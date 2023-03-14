import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class ModifyCarFineColumn1677027914247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cars', 'find_amount')

    await queryRunner.addColumn(
      'cars',
      new TableColumn({
        name: 'fine_amount',
        type: 'numeric',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cars', 'fine_amount')

    await queryRunner.addColumn(
      'cars',
      new TableColumn({
        name: 'find_amount',
        type: 'numeric',
      }),
    )
  }
}
