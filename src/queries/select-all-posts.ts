import { dbConn } from "../db-connection";
import { Post } from "../entity/PostImplicit";

export const selectAllPost = async () => {
    const connection = await dbConn();

    const postRepository = connection.getRepository(Post);
    const queryBuilder = postRepository.createQueryBuilder('post');

    const posts = await queryBuilder.select().getMany();

    console.log(`
        SELECT * from Post;
    `)
    console.log(posts)
}
