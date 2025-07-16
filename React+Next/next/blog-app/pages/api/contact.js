import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid parameters" });
    }
    const newMessage = {
      email,
      name,
      message,
    };
    let client;
    const connectionString = `${process.env.mongo_url}`;

    try {
      client = await MongoClient.connect(connectionString, {
        useUnifiedTopology: true,
      });
    } catch (error) {
      return res.status(500).json({ message: "Could not connect to database" });
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      return res.status(500).json({ message: "Could not store message" });
    }

    client.close();

    res
      .status(201)
      .json({ message: "Message stored successfully", message: newMessage });
  }
}
