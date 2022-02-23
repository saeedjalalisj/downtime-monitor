import {MigrationInterface, QueryRunner} from "typeorm";

export class siteAddUserId1645456132298 implements MigrationInterface {
    name = 'siteAddUserId1645456132298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "site" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "title" character varying NOT NULL, "url" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "description" character varying NOT NULL, "userId" integer NOT NULL, "usersId" integer, CONSTRAINT "PK_635c0eeabda8862d5b0237b42b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f04e70463f35bf97bbc9b3a8e5" ON "site" ("title") `);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_on" SET DEFAULT 'Mon, 21 Feb 2022 15:08:54 GMT'`);
        await queryRunner.query(`ALTER TABLE "site" ADD CONSTRAINT "FK_f5c31cba2f099e697f0e88c3acd" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "site" DROP CONSTRAINT "FK_f5c31cba2f099e697f0e88c3acd"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_on" SET DEFAULT '2022-02-12 14:04:55'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f04e70463f35bf97bbc9b3a8e5"`);
        await queryRunner.query(`DROP TABLE "site"`);
    }

}
