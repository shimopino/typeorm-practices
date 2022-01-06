import {MigrationInterface, QueryRunner} from "typeorm";

export class init1641476163707 implements MigrationInterface {
    name = 'init1641476163707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "user_implicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "group_implicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "group_implicit_users_user_implicit" ("groupImplicitId" integer NOT NULL, "userImplicitId" integer NOT NULL, PRIMARY KEY ("groupImplicitId", "userImplicitId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_88c376e03d3c71bcf2eced161c" ON "group_implicit_users_user_implicit" ("groupImplicitId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7368fc878246790d63dd79d19f" ON "group_implicit_users_user_implicit" ("userImplicitId") `);
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user_implicit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "userId") SELECT "id", "title", "userId" FROM "post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
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
        await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "post"("id", "title", "userId") SELECT "id", "title", "userId" FROM "temporary_post"`);
        await queryRunner.query(`DROP TABLE "temporary_post"`);
        await queryRunner.query(`DROP INDEX "IDX_7368fc878246790d63dd79d19f"`);
        await queryRunner.query(`DROP INDEX "IDX_88c376e03d3c71bcf2eced161c"`);
        await queryRunner.query(`DROP TABLE "group_implicit_users_user_implicit"`);
        await queryRunner.query(`DROP TABLE "group_implicit"`);
        await queryRunner.query(`DROP TABLE "user_implicit"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
