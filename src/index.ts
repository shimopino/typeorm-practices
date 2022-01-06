import "reflect-metadata";
import { selectAllPost } from "./queries/select-all-posts";
import { selectPostByUser } from "./queries/select-post-by-user";

const main = async () => {
  selectAllPost();
  selectPostByUser();
};

main().catch((error) => console.log(error));
