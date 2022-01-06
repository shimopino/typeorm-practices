import { dbConn } from "../db-connection";
import * as faker from "faker";
import { UserImplicit } from "../entity/UserImplicit";
import { UserExplicit } from "../entity/UserExplicit";
import { GroupImplicit } from "../entity/GroupImplicit";
import { GroupExplicit } from "../entity/GroupExplicit";
import { UserGroupExplicit } from "../entity/UserGroupExplicit";
import { PostImplicit } from "../entity/PostImplicit";
import { PostExplicit } from "../entity/PostExplicit";

/**
 * SQL-Server か PostgreSQL の場合には returning 構文が使用できるため、
 * もっと簡潔に記述できる
 *
 * https://stackoverflow.com/questions/61581755/returning-id-of-inserted-query-in-typeorm-and-mysql
 */
const main = async () => {
  const connection = await dbConn();

  /**
   * User Initial Data
   */
  const userImplicit = await connection
    .getRepository(UserImplicit)
    .createQueryBuilder()
    .insert()
    .values([
      { name: faker.internet.userName(), email: faker.internet.email() },
      { name: faker.internet.userName(), email: faker.internet.email() },
      { name: faker.internet.userName(), email: faker.internet.email() },
    ])
    // .returning('id')
    .execute();

  userImplicit.identifiers.forEach((identifier) => {
    console.log(`user implicit insert identifier: ${identifier.id}`);
  });

  const userExplicit = await connection
    .getRepository(UserExplicit)
    .createQueryBuilder()
    .insert()
    .values([
      { name: faker.internet.userName(), email: faker.internet.email() },
      { name: faker.internet.userName(), email: faker.internet.email() },
      { name: faker.internet.userName(), email: faker.internet.email() },
    ])
    // .returning('id')
    .execute();

  userExplicit.identifiers.forEach((identifier) => {
    console.log(`user explicit insert identifier: ${identifier.id}`);
  });

  /**
   * Group Initial Data
   */
  const groupImplicit = await connection
    .getRepository(GroupImplicit)
    .createQueryBuilder()
    .insert()
    .values([
      { name: faker.company.companyName() },
      { name: faker.company.companyName() },
      { name: faker.company.companyName() },
    ])
    // .returning('id')
    .execute();

  groupImplicit.identifiers.forEach((identifier) => {
    console.log(`group implicit insert identifier: ${identifier.id}`);
  });

  const groupExplicit = await connection
    .getRepository(GroupExplicit)
    .createQueryBuilder()
    .insert()
    // with users
    .values([
      { name: faker.company.companyName() },
      { name: faker.company.companyName() },
      { name: faker.company.companyName() },
    ])
    // .returning('id')
    .execute();

  groupExplicit.identifiers.forEach((identifier) => {
    console.log(`group explicit insert identifier: ${identifier.id}`);
  });

  /**
   * User - Group Relations
   */
  /** Implicit */
  const findAllImplicitUsers = await connection
    .getRepository(UserImplicit)
    .createQueryBuilder()
    .select()
    .getMany();

  console.log(findAllImplicitUsers);

  // const userGroupsImplicit = await connection
  //   .getRepository(GroupImplicit)
  //   .createQueryBuilder()
  //   .update()
  //   .set({ users: [{ id: 1 }, { id: 2 }, { id: 3 }] })
  //   .where("id = :id", { id: 1 })
  //   .execute();

  /** Explicit */
  const userGroupsExplicit = await connection
    .getRepository(UserGroupExplicit)
    .createQueryBuilder()
    .insert()
    .values([
      { user: { id: 1 }, group: { id: 1 }, authenticationType: "1" },
      { user: { id: 2 }, group: { id: 1 }, authenticationType: "1" },
      { user: { id: 3 }, group: { id: 1 }, authenticationType: "1" },
      { user: { id: 1 }, group: { id: 2 }, authenticationType: "1" },
      { user: { id: 2 }, group: { id: 2 }, authenticationType: "1" },
      { user: { id: 3 }, group: { id: 3 }, authenticationType: "1" },
    ])
    .execute();

  /**
   * Post
   */
  const postImplicitUsers = await connection
    .getRepository(PostImplicit)
    .createQueryBuilder()
    .insert()
    .values([
      { title: "記事1", user: { id: 1 } },
      { title: "記事2", user: { id: 1 } },
      { title: "記事3", user: { id: 2 } },
    ])
    .execute();

  const postExplicitUsers = await connection
    .getRepository(PostExplicit)
    .createQueryBuilder()
    .insert()
    .values([
      { title: "記事1", user: { id: 1 } },
      { title: "記事2", user: { id: 1 } },
      { title: "記事3", user: { id: 2 } },
    ])
    .execute();
};

main()
  .then(() => console.log("seed scceed"))
  .catch((e) => console.error(e));
