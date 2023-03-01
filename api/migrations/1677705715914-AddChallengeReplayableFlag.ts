import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChallengeReplayableFlag1677705715914 implements MigrationInterface {
    name = 'AddChallengeReplayableFlag1677705715914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "challenges" ADD "replayable" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "challenges" DROP COLUMN "replayable"`);
    }
}
