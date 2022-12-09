import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTurnScore1670616725305 implements MigrationInterface {
    name = 'AddTurnScore1670616725305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "turns" ADD "score" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "turns" DROP COLUMN "score"`);
    }

}
