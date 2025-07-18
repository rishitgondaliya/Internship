import { MongoClient } from "mongodb";

export default async function ConnectDB() {
  const client = await MongoClient.connect(
    "mongodb://localhost:27017/next-auth"
  );

  return client;
}
