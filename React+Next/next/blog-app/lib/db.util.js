import { MongoClient } from "mongodb";

const username = encodeURIComponent(process.env.mongodb_username);
const password = encodeURIComponent(process.env.mongodb_password);
const cluster = process.env.mongodb_clustername;
const database = process.env.mongodb_database;

if (!username || !password || !cluster || !database) {
  throw new Error("Missing MongoDB environment variables.");
}

const uri = `mongodb+srv://${username}:${password}@${cluster}.wkgcf.mongodb.net/${database}`;

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
