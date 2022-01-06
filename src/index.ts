import "reflect-metadata";
import { selectAllPost } from "./queries/select-all-posts";

const main = async () => {
  selectAllPost();
};

main().catch((error) => console.log(error));
