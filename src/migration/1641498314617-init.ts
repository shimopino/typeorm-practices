import {MigrationInterface, QueryRunner} from "typeorm";

export class init1641498314617 implements MigrationInterface {
    name = 'init1641498314617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post_explicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "user_explicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user_group_explicit" ("authenticationType" varchar NOT NULL, "userId" integer NOT NULL, "groupId" integer NOT NULL, PRIMARY KEY ("userId", "groupId"))`);
        await queryRunner.query(`CREATE TABLE "group_explicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "post_implicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "user_implicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "group_implicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "group_implicit_users_user_implicit" ("groupImplicitId" integer NOT NULL, "userImplicitId" integer NOT NULL, PRIMARY KEY ("groupImplicitId", "userImplicitId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_88c376e03d3c71bcf2eced161c" ON "group_implicit_users_user_implicit" ("groupImplicitId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7368fc878246790d63dd79d19f" ON "group_implicit_users_user_implicit" ("userImplicitId") `);
        await queryRunner.query(`CREATE TABLE "temporary_post_explicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_f233652e33d9b4c81e89fa84475" FOREIGN KEY ("userId") REFERENCES "user_explicit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_post_explicit"("id", "title", "userId") SELECT "id", "title", "userId" FROM "post_explicit"`);
        await queryRunner.query(`DROP TABLE "post_explicit"`);
        await queryRunner.query(`ALTER TABLE "temporary_post_explicit" RENAME TO "post_explicit"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_group_explicit" ("authenticationType" varchar NOT NULL, "userId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "FK_de23f88e4a4d7847dd10af03b12" FOREIGN KEY ("userId") REFERENCES "user_explicit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cac2aaadcdae083758c2a486100" FOREIGN KEY ("groupId") REFERENCES "group_explicit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("userId", "groupId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_group_explicit"("authenticationType", "userId", "groupId") SELECT "authenticationType", "userId", "groupId" FROM "user_group_explicit"`);
        await queryRunner.query(`DROP TABLE "user_group_explicit"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_group_explicit" RENAME TO "user_group_explicit"`);
        await queryRunner.query(`CREATE TABLE "temporary_post_implicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_69c6d3f8b7d86e853052f34d554" FOREIGN KEY ("userId") REFERENCES "user_implicit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_post_implicit"("id", "title", "userId") SELECT "id", "title", "userId" FROM "post_implicit"`);
        await queryRunner.query(`DROP TABLE "post_implicit"`);
        await queryRunner.query(`ALTER TABLE "temporary_post_implicit" RENAME TO "post_implicit"`);
        await queryRunner.query(`DROP INDEX "IDX_88c376e03d3c71bcf2eced161c"`);
        await queryRunner.query(`DROP INDEX "IDX_7368fc878246790d63dd79d19f"`);
        await queryRunner.query(`CREATE TABLE "temporary_group_implicit_users_user_implicit" ("groupImplicitId" integer NOT NULL, "userImplicitId" integer NOT NULL, CONSTRAINT "FK_88c376e03d3c71bcf2eced161c0" FOREIGN KEY ("groupImplicitId") REFERENCES "group_implicit" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_7368fc878246790d63dd79d19f1" FOREIGN KEY ("userImplicitId") REFERENCES "user_implicit" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("groupImplicitId", "userImplicitId"))`);
        await queryRunner.query(`INSERT INTO "temporary_group_implicit_users_user_implicit"("groupImplicitId", "userImplicitId") SELECT "groupImplicitId", "userImplicitId" FROM "group_implicit_users_user_implicit"`);
        await queryRunner.query(`DROP TABLE "group_implicit_users_user_implicit"`);
        await queryRunner.query(`ALTER TABLE "temporary_group_implicit_users_user_implicit" RENAME TO "group_implicit_users_user_implicit"`);
        await queryRunner.query(`CREATE INDEX "IDX_88c376e03d3c71bcf2eced161c" ON "group_implicit_users_user_implicit" ("groupImplicitId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7368fc878246790d63dd79d19f" ON "group_implicit_users_user_implicit" ("userImplicitId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_7368fc878246790d63dd79d19f"`);
        await queryRunner.query(`DROP INDEX "IDX_88c376e03d3c71bcf2eced161c"`);
        await queryRunner.query(`ALTER TABLE "group_implicit_users_user_implicit" RENAME TO "temporary_group_implicit_users_user_implicit"`);
        await queryRunner.query(`CREATE TABLE "group_implicit_users_user_implicit" ("groupImplicitId" integer NOT NULL, "userImplicitId" integer NOT NULL, PRIMARY KEY ("groupImplicitId", "userImplicitId"))`);
        await queryRunner.query(`INSERT INTO "group_implicit_users_user_implicit"("groupImplicitId", "userImplicitId") SELECT "groupImplicitId", "userImplicitId" FROM "temporary_group_implicit_users_user_implicit"`);
        await queryRunner.query(`DROP TABLE "temporary_group_implicit_users_user_implicit"`);
        await queryRunner.query(`CREATE INDEX "IDX_7368fc878246790d63dd79d19f" ON "group_implicit_users_user_implicit" ("userImplicitId") `);
        await queryRunner.query(`CREATE INDEX "IDX_88c376e03d3c71bcf2eced161c" ON "group_implicit_users_user_implicit" ("groupImplicitId") `);
        await queryRunner.query(`ALTER TABLE "post_implicit" RENAME TO "temporary_post_implicit"`);
        await queryRunner.query(`CREATE TABLE "post_implicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "post_implicit"("id", "title", "userId") SELECT "id", "title", "userId" FROM "temporary_post_implicit"`);
        await queryRunner.query(`DROP TABLE "temporary_post_implicit"`);
        await queryRunner.query(`ALTER TABLE "user_group_explicit" RENAME TO "temporary_user_group_explicit"`);
        await queryRunner.query(`CREATE TABLE "user_group_explicit" ("authenticationType" varchar NOT NULL, "userId" integer NOT NULL, "groupId" integer NOT NULL, PRIMARY KEY ("userId", "groupId"))`);
        await queryRunner.query(`INSERT INTO "user_group_explicit"("authenticationType", "userId", "groupId") SELECT "authenticationType", "userId", "groupId" FROM "temporary_user_group_explicit"`);
        await queryRunner.query(`DROP TABLE "temporary_user_group_explicit"`);
        await queryRunner.query(`ALTER TABLE "post_explicit" RENAME TO "temporary_post_explicit"`);
        await queryRunner.query(`CREATE TABLE "post_explicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "post_explicit"("id", "title", "userId") SELECT "id", "title", "userId" FROM "temporary_post_explicit"`);
        await queryRunner.query(`DROP TABLE "temporary_post_explicit"`);
        await queryRunner.query(`DROP INDEX "IDX_7368fc878246790d63dd79d19f"`);
        await queryRunner.query(`DROP INDEX "IDX_88c376e03d3c71bcf2eced161c"`);
        await queryRunner.query(`DROP TABLE "group_implicit_users_user_implicit"`);
        await queryRunner.query(`DROP TABLE "group_implicit"`);
        await queryRunner.query(`DROP TABLE "user_implicit"`);
        await queryRunner.query(`DROP TABLE "post_implicit"`);
        await queryRunner.query(`DROP TABLE "group_explicit"`);
        await queryRunner.query(`DROP TABLE "user_group_explicit"`);
        await queryRunner.query(`DROP TABLE "user_explicit"`);
        await queryRunner.query(`DROP TABLE "post_explicit"`);
    }

}
