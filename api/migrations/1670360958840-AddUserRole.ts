import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRole1670360958840 implements MigrationInterface {
    name = 'AddUserRole1670360958840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "active" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "active" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
