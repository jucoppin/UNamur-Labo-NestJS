import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1676552212106 implements MigrationInterface {
  name = 'InitDatabase1676552212106'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "manager" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "building" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, "manager_id" integer NOT NULL, CONSTRAINT "PK_bbfaf6c11f141a22d2ab105ee5f" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "building" ADD CONSTRAINT "FK_3a1024912c2f6a95c062c0ba5e0" FOREIGN KEY ("manager_id") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "building" DROP CONSTRAINT "FK_3a1024912c2f6a95c062c0ba5e0"`);
    await queryRunner.query(`DROP TABLE "building"`);
    await queryRunner.query(`DROP TABLE "manager"`);
  }

}
