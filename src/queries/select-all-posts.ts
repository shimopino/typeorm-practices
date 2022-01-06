import { dbConn } from "../db-connection";
import { PostImplicit } from "../entity/PostImplicit";

export const selectAllPost = async () => {
    const connection = await dbConn();

    /**
     * Implicit
     */
    const postRepository = connection.getRepository(PostImplicit);
    const queryBuilder = postRepository.createQueryBuilder('post_implicit');

    const posts = await queryBuilder.select().getMany();

    console.log(`
        SELECT * from PostImplicit;
    `)
    console.log(posts)
}
