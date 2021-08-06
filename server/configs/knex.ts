import {knex, Knex} from 'knex'
import { DB_ACC, DB_CLIENT, DB_HOST, DB_NAME, DB_PWD } from './env'

const knexConfig:Knex.Config = {
    client: DB_CLIENT,
    connection: {
        connectionString: `postgresql://${DB_ACC}:${DB_PWD}@${DB_HOST}/${DB_NAME}`,
        requestTimeout: 3000000,
    },
} 

export const KnexConn = knex(knexConfig)
