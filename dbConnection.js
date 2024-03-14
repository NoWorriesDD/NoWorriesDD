//-------------DataBase Connection----------


const prop = require('./dbProperties');

const mysql = require ('mysql');

module.exports = {
    getConnection : ()=>{
        return mysql.createConnection(prop);
    }
}

// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'bigdata'
// });

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log('Connected to MySQL');
// });

// module.exports = connection;