import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTurnCombo1674509581442 implements MigrationInterface {
    name = 'AddTurnCombo1674509581442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "turns" ADD "combo" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "turns" DROP COLUMN "combo"`);
    }

}
