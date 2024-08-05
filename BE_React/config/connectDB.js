const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'asm2',
  multipleStatements: true
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});
module.exports = connection;
