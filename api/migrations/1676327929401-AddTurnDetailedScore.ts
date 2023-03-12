import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTurnDetailedScore1676327929401 implements MigrationInterface {
    name = 'AddTurnDetailedScore1676327929401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "turns" ADD "detailedScore" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "turns" DROP COLUMN "detailedScore"`);
    }

}
