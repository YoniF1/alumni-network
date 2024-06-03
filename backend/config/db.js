import dotenv from 'dotenv'
import path from 'path'
const __dirname = import.meta.dirname;
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import knex from 'knex'

const { connectionString } = process.env

export const db = knex({
    client: 'pg',
    connection: {
        connectionString: connectionString
}});
