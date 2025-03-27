require('dotenv').config({ path: '.env'});
const Pool = require("pg").Pool;


const pool = new Pool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

module.exports = pool;