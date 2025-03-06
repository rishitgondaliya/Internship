const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://rishit_gondaliya:SQF4m5kn0GqumnGt@node-1.wkgcf.mongodb.net/shop?retryWrites=true&w=majority&appName=node-1"
  )
    .then((client) => {
      console.log("Connection established.!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log("Error connecting with server", err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error("No database found.");
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
