const mysql = require('mysql2');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "@1862003",
    database: "qlpkdkpn"
});

module.exports = db;
