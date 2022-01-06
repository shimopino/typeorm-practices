import "reflect-metadata";
import { selectGroupWithUser } from "./queries/select-all-groups-with-user";
import { selectAllPost } from "./queries/select-all-posts";
import { selectGroupByUser } from "./queries/select-group-by-user";
import { selectPostByUser } from "./queries/select-post-by-user";

const main = async () => {
  selectAllPost();
  selectPostByUser();
  selectGroupWithUser()
  selectGroupByUser()
};

main().catch((error) => console.log(error));
