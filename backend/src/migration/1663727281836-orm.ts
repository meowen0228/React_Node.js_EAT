import { MigrationInterface, QueryRunner } from "typeorm";

export class orm1663727281836 implements MigrationInterface {
    name = 'orm1663727281836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "age" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "age" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" SET NOT NULL`);
    }

}
