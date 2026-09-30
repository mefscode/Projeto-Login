import mysql from 'mysql2/promise.js';

const con = await mysql.createConnection({
    host: process.env.sqlhost,
    user: process.env.sqluser,
    password: process.env.sqlpasswrd,
    database: process.env.sqldatabase
})

console.log("A API está conectada com MYSQL");

export default con;