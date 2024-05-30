import knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const { connectionString } = process.env

export const db = knex({
    client: 'pg',
    connection: {
        connectionString: connectionString
}});
