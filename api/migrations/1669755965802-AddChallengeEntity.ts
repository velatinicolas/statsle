import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChallengeEntity1669755965802 implements MigrationInterface {
    name = 'AddChallengeEntity1669755965802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "challenges" ("identifier" SERIAL NOT NULL, "name" text NOT NULL, "url" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5a383862a9ce39c614f62f781c1" UNIQUE ("name"), CONSTRAINT "PK_9a3c903c3507c6923bd25a51aae" PRIMARY KEY ("identifier"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "challenges"`);
    }

}
