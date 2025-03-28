const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient; // used to connect to a MongoDB database
const dotenv = require('dotenv')

dotenv.config()

let _db; // for storing the database connection once it is established

const mongoConnect = (callback) => {
  MongoClient.connect(
    // used to establish a connection to the MongoDB server. // returns a promise
    process.env.MONGO_DRIVER_URL
  )
    .then((client) => {
      // client => MongoDB client instance. => an object that represents the connection to a MongoDB database server.
      console.log("Connection established.!");
      _db = client.db(); // called to get the database instance from the client
      callback(); // to start the server or perform database related tasks
    })
    .catch((err) => {
      console.log("Error connecting with server", err);
    });
};

const getDb = () => {
  if (_db) {
    return _db; // returns the stored database instance
  }
  throw new Error("No database found.");
};

exports.mongoConnect = mongoConnect; // is exported to allow other parts of the application to establish a connection.

exports.getDb = getDb; // is exported to access the connected database instance in other modules.
