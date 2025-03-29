const mysql = require('mysql2');
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'candy', // Corrected database name
    port: 8889 // Ensure this matches your MySQL port
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    
    console.log('Connected as id ' + db.threadId);
});

module.exports = db;
