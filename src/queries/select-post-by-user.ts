import { dbConn } from "../db-connection";
import { PostImplicit } from "../entity/PostImplicit";

export const selectPostByUser = async () => {
  const connection = await dbConn();

  /**
   * Implicit
   */
  const postRepository = connection.getRepository(PostImplicit);
  const queryBuilder = postRepository.createQueryBuilder("post_implicit");

  const posts = await queryBuilder
    .select()
    .where("post_implicit.userId = :userId", { userId: 1 })
    .getMany();

  console.log(`
        SELECT * from PostImplicit
        WHERE userId = 1;
    `);
  console.log(posts);
};
