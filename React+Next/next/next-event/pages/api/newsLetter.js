import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email" });
    }
    const client = await MongoClient.connect(
      "mongodb://localhost:27017/next-event",
      { useUnifiedTopology: true }
    );
    const db = client.db();
    await db.collection("emails").insertOne({ email: email });
    client.close();
    res.status(201).json({ message: "Sign up successfully." });
  }
}
