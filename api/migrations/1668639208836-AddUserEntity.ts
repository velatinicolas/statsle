import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEntity1668639208836 implements MigrationInterface {
    name = 'AddUserEntity1668639208836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("identifier" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" text NOT NULL, "email" text, "password" text NOT NULL, "active" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_2e7b7debda55e0e7280dc93663d" PRIMARY KEY ("identifier"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
