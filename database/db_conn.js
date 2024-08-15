const mysql = require('mysql2/promise');
const db_conn = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log("Database connected:", connection.config.database);
        global.db = connection; // Store the connection in a global variable
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
module.exports = db_conn;
