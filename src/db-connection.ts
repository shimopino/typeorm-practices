import { createConnection } from "typeorm";

const dbConn = async () => await createConnection();

export { dbConn };
