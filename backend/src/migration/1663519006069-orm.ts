import { MigrationInterface, QueryRunner } from "typeorm";

export class orm1663519006069 implements MigrationInterface {
    name = 'orm1663519006069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_item" ADD "storeId" integer`);
        await queryRunner.query(`ALTER TABLE "store_item" ADD CONSTRAINT "FK_40b9bf33944256a6e5cbaac9262" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_item" DROP CONSTRAINT "FK_40b9bf33944256a6e5cbaac9262"`);
        await queryRunner.query(`ALTER TABLE "store_item" DROP COLUMN "storeId"`);
    }

}
