const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

/*
db.getConnection().then((connection) => {
    console.log(`Connected...!`);
    connection.release();
}).catch((reason) => {
    console.error("Not connected", reason.message);
});
*/

module.exports = db;