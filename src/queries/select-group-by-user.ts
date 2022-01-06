import { dbConn } from "../db-connection";
import { GroupExplicit } from "../entity/GroupExplicit";

export const selectGroupByUser = async () => {
  const connection = await dbConn();

  /**
   * Implicit
   */
  const postRepository = connection.getRepository(GroupExplicit);
  const queryBuilder = postRepository.createQueryBuilder("group_explicit");

  const posts = await queryBuilder
    .innerJoin("group_explicit.userGroups", "userGroup")
    .select()
    .where("userGroup.userId = :userId", { userId: 1 })
    .getMany();

  console.log(`
        SELECT * FROM group_explicit
        INNER JOIN user_group_explicit userGroup
        ON userGroup.groupId = group_explicit.id
        WHERE userGroup.userId = 1;
    `);
  console.log(posts);
};
