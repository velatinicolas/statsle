import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1670181328355 implements MigrationInterface {
    name = 'InitialMigration1670181328355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "challenges" ("identifier" SERIAL NOT NULL, "name" text NOT NULL, "url" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5a383862a9ce39c614f62f781c1" UNIQUE ("name"), CONSTRAINT "PK_9a3c903c3507c6923bd25a51aae" PRIMARY KEY ("identifier"))`);
        await queryRunner.query(`CREATE TABLE "games" ("identifier" SERIAL NOT NULL, "number" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "challengeIdentifier" integer, CONSTRAINT "PK_6dc068a2938616c0f5de8126f53" PRIMARY KEY ("identifier"))`);
        await queryRunner.query(`CREATE TABLE "users" ("identifier" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" text NOT NULL, "email" text, "password" text NOT NULL, "active" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_2e7b7debda55e0e7280dc93663d" PRIMARY KEY ("identifier"))`);
        await queryRunner.query(`CREATE TABLE "turns" ("identifier" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "rawResult" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "gameIdentifier" integer, "userIdentifier" uuid, CONSTRAINT "PK_b999586100850d607350104d5dd" PRIMARY KEY ("identifier"))`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_9dd391e7f09799d4c6e3af5cd81" FOREIGN KEY ("challengeIdentifier") REFERENCES "challenges"("identifier") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "turns" ADD CONSTRAINT "FK_c3a6310504329f9e36bd042c0aa" FOREIGN KEY ("gameIdentifier") REFERENCES "games"("identifier") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "turns" ADD CONSTRAINT "FK_e2b4054dac2520601ed77dae127" FOREIGN KEY ("userIdentifier") REFERENCES "users"("identifier") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "turns" DROP CONSTRAINT "FK_e2b4054dac2520601ed77dae127"`);
        await queryRunner.query(`ALTER TABLE "turns" DROP CONSTRAINT "FK_c3a6310504329f9e36bd042c0aa"`);
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_9dd391e7f09799d4c6e3af5cd81"`);
        await queryRunner.query(`DROP TABLE "turns"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`DROP TABLE "challenges"`);
    }

}
