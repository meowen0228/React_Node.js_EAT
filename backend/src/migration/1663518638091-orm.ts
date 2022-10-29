import { MigrationInterface, QueryRunner } from "typeorm";

export class orm1663518638091 implements MigrationInterface {
    name = 'orm1663518638091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "store" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store_item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_d8d520cf8af78e9dd5bc47943c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "city" character varying NOT NULL, "age" smallint NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "deliveryAddress" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_detail" ("id" SERIAL NOT NULL, "qty" integer NOT NULL, "orderId" integer NOT NULL, "storeItemId" integer NOT NULL, CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_35bf14c014f84188f191e6618b5" FOREIGN KEY ("storeItemId") REFERENCES "store_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_35bf14c014f84188f191e6618b5"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`DROP TABLE "order_detail"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "store_item"`);
        await queryRunner.query(`DROP TABLE "store"`);
    }

}
