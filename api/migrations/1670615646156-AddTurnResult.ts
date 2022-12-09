import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTurnResult1670615646156 implements MigrationInterface {
    name = 'AddTurnResult1670615646156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "turns" ADD "result" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "turns" DROP COLUMN "result"`);
    }

}
