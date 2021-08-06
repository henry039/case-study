import {DB_ACC, DB_HOST, DB_NAME, DB_PWD} from './configs/env'
import { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: {
    connectionString: `postgresql://${DB_ACC}:${DB_PWD}@${DB_HOST}/${DB_NAME}`,
    timezone: "utc",
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export default config;