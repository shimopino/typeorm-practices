import {MigrationInterface, QueryRunner} from "typeorm";

export class init1641493326629 implements MigrationInterface {
    name = 'init1641493326629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_explicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user_group_explicit" ("authenticationType" varchar NOT NULL, "userId" integer NOT NULL, "groupId" integer NOT NULL, PRIMARY KEY ("userId", "groupId"))`);
        await queryRunner.query(`CREATE TABLE "group_explicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_user_group_explicit" ("authenticationType" varchar NOT NULL, "userId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "FK_de23f88e4a4d7847dd10af03b12" FOREIGN KEY ("userId") REFERENCES "user_explicit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cac2aaadcdae083758c2a486100" FOREIGN KEY ("groupId") REFERENCES "group_explicit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("userId", "groupId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_group_explicit"("authenticationType", "userId", "groupId") SELECT "authenticationType", "userId", "groupId" FROM "user_group_explicit"`);
        await queryRunner.query(`DROP TABLE "user_group_explicit"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_group_explicit" RENAME TO "user_group_explicit"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_group_explicit" RENAME TO "temporary_user_group_explicit"`);
        await queryRunner.query(`CREATE TABLE "user_group_explicit" ("authenticationType" varchar NOT NULL, "userId" integer NOT NULL, "groupId" integer NOT NULL, PRIMARY KEY ("userId", "groupId"))`);
        await queryRunner.query(`INSERT INTO "user_group_explicit"("authenticationType", "userId", "groupId") SELECT "authenticationType", "userId", "groupId" FROM "temporary_user_group_explicit"`);
        await queryRunner.query(`DROP TABLE "temporary_user_group_explicit"`);
        await queryRunner.query(`DROP TABLE "group_explicit"`);
        await queryRunner.query(`DROP TABLE "user_group_explicit"`);
        await queryRunner.query(`DROP TABLE "user_explicit"`);
    }

}
