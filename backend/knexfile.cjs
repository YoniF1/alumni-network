const knex = require('knex');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env')})

const { connectionString } = process.env;

module.exports = {
    client: 'pg',
    connection: connectionString,
    seeds: {
        directory: './seeds'
    }
}