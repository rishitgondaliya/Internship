// without sequelize

// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node',
//     password: 'mysql@1234'
// })

// module.exports = pool.promise()

// using sequelize

const Sequelize = require("sequelize");

const sequelize = new Sequelize("node", "root", "mysql@1234", {  //schema, user, password
  dialect: "mysql", //specifies which DBMS you're using. It tells Sequelize how to communicate with the database
  host: "localhost", // host name
});

module.exports = sequelize