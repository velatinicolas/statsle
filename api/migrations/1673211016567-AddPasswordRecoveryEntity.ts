import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordRecoveryEntity1673211016567 implements MigrationInterface {
    name = 'AddPasswordRecoveryEntity1673211016567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "password_recoveries" ("identifier" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" text NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "usedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userIdentifier" uuid, CONSTRAINT "PK_d7e6e243d1c48f3240edca8c3da" PRIMARY KEY ("identifier"))`);
        await queryRunner.query(`ALTER TABLE "password_recoveries" ADD CONSTRAINT "FK_31156dff10ccf90d69542b24dd7" FOREIGN KEY ("userIdentifier") REFERENCES "users"("identifier") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password_recoveries" DROP CONSTRAINT "FK_31156dff10ccf90d69542b24dd7"`);
        await queryRunner.query(`DROP TABLE "password_recoveries"`);
    }

}
