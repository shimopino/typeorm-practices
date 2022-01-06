import { dbConn } from "../db-connection";
import { GroupExplicit } from "../entity/GroupExplicit";

export const selectGroupByUser = async () => {
  const connection = await dbConn();

  /**
   * Implicit
   */
  const postRepository = connection.getRepository(GroupExplicit);
  // ここで指定している名称は以下が該当する
  //                                    ↓
  // SELECT * FROM group_explicit group_explicit
  const queryBuilder = postRepository.createQueryBuilder("group_explicit");

  const posts = await queryBuilder
    .innerJoin("group_explicit.userGroups", "user_group")
    .select()
    .where("user_group.userId = :userId", { userId: 1 })
    .getMany();

  console.log(`
        SELECT * FROM group_explicit group_explicit
        INNER JOIN user_group_explicit user_group
        ON user_group.groupId = group_explicit.id
        WHERE user_group.userId = 1;
    `);
  console.log(posts);

  // const groupResultByRepo = await postRepository.find({
  //   where: {
  //     "userGroups": { userId: 1 },
  //   },
  //   relations: ["userGroups"],
  // })

  // console.log(`--- Repo ---`)
  // console.log(groupResultByRepo)
};
