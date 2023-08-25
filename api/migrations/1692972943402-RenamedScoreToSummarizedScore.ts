import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamedScoreToSummarizedScore1692972943402 implements MigrationInterface {
    name = 'RenamedScoreToSummarizedScore1692972943402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "turns" RENAME COLUMN "score" TO "summarizedScore"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "turns" RENAME COLUMN "summarizedScore" TO "score"`);
    }

}
