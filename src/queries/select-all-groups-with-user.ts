import { dbConn } from "../db-connection";
import { GroupExplicit } from "../entity/GroupExplicit";

export const selectGroupWithUser = async () => {
  const connection = await dbConn();

  /**
   * Implicit
   */
  const postRepository = connection.getRepository(GroupExplicit);
  const queryBuilder = postRepository.createQueryBuilder("group_explicit");

  const groupsWithUser = await queryBuilder
    .innerJoinAndSelect("group_explicit.userGroups", "userGroup")
    .getMany();

  console.log(`
        SELECT * from group_explicit 
        INNER JOIN user_group_explicit userGroup
        ON userGroup.group_id = group_explicit.id;
    `);

  console.log(groupsWithUser);
};
