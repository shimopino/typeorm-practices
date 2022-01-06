import {MigrationInterface, QueryRunner} from "typeorm";

export class initialSchema1641473403824 implements MigrationInterface {
    name = 'initialSchema1641473403824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_implicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "group_implicit" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user_implicit_groups_group_implicit" ("userImplicitId" integer NOT NULL, "groupImplicitId" integer NOT NULL, PRIMARY KEY ("userImplicitId", "groupImplicitId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_242b2a9f231aefcce0b9f31de0" ON "user_implicit_groups_group_implicit" ("userImplicitId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc5f27e08f3bac6851c9ed083a" ON "user_implicit_groups_group_implicit" ("groupImplicitId") `);
        await queryRunner.query(`CREATE TABLE "group_implicit_users_user_implicit" ("groupImplicitId" integer NOT NULL, "userImplicitId" integer NOT NULL, PRIMARY KEY ("groupImplicitId", "userImplicitId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_88c376e03d3c71bcf2eced161c" ON "group_implicit_users_user_implicit" ("groupImplicitId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7368fc878246790d63dd79d19f" ON "group_implicit_users_user_implicit" ("userImplicitId") `);
        await queryRunner.query(`DROP INDEX "IDX_242b2a9f231aefcce0b9f31de0"`);
        await queryRunner.query(`DROP INDEX "IDX_dc5f27e08f3bac6851c9ed083a"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_implicit_groups_group_implicit" ("userImplicitId" integer NOT NULL, "groupImplicitId" integer NOT NULL, CONSTRAINT "FK_242b2a9f231aefcce0b9f31de0f" FOREIGN KEY ("userImplicitId") REFERENCES "user_implicit" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_dc5f27e08f3bac6851c9ed083ae" FOREIGN KEY ("groupImplicitId") REFERENCES "group_implicit" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userImplicitId", "groupImplicitId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_implicit_groups_group_implicit"("userImplicitId", "groupImplicitId") SELECT "userImplicitId", "groupImplicitId" FROM "user_implicit_groups_group_implicit"`);
        await queryRunner.query(`DROP TABLE "user_implicit_groups_group_implicit"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_implicit_groups_group_implicit" RENAME TO "user_implicit_groups_group_implicit"`);
        await queryRunner.query(`CREATE INDEX "IDX_242b2a9f231aefcce0b9f31de0" ON "user_implicit_groups_group_implicit" ("userImplicitId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc5f27e08f3bac6851c9ed083a" ON "user_implicit_groups_group_implicit" ("groupImplicitId") `);
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
        await queryRunner.query(`DROP INDEX "IDX_dc5f27e08f3bac6851c9ed083a"`);
        await queryRunner.query(`DROP INDEX "IDX_242b2a9f231aefcce0b9f31de0"`);
        await queryRunner.query(`ALTER TABLE "user_implicit_groups_group_implicit" RENAME TO "temporary_user_implicit_groups_group_implicit"`);
        await queryRunner.query(`CREATE TABLE "user_implicit_groups_group_implicit" ("userImplicitId" integer NOT NULL, "groupImplicitId" integer NOT NULL, PRIMARY KEY ("userImplicitId", "groupImplicitId"))`);
        await queryRunner.query(`INSERT INTO "user_implicit_groups_group_implicit"("userImplicitId", "groupImplicitId") SELECT "userImplicitId", "groupImplicitId" FROM "temporary_user_implicit_groups_group_implicit"`);
        await queryRunner.query(`DROP TABLE "temporary_user_implicit_groups_group_implicit"`);
        await queryRunner.query(`CREATE INDEX "IDX_dc5f27e08f3bac6851c9ed083a" ON "user_implicit_groups_group_implicit" ("groupImplicitId") `);
        await queryRunner.query(`CREATE INDEX "IDX_242b2a9f231aefcce0b9f31de0" ON "user_implicit_groups_group_implicit" ("userImplicitId") `);
        await queryRunner.query(`DROP INDEX "IDX_7368fc878246790d63dd79d19f"`);
        await queryRunner.query(`DROP INDEX "IDX_88c376e03d3c71bcf2eced161c"`);
        await queryRunner.query(`DROP TABLE "group_implicit_users_user_implicit"`);
        await queryRunner.query(`DROP INDEX "IDX_dc5f27e08f3bac6851c9ed083a"`);
        await queryRunner.query(`DROP INDEX "IDX_242b2a9f231aefcce0b9f31de0"`);
        await queryRunner.query(`DROP TABLE "user_implicit_groups_group_implicit"`);
        await queryRunner.query(`DROP TABLE "group_implicit"`);
        await queryRunner.query(`DROP TABLE "user_implicit"`);
    }

}
