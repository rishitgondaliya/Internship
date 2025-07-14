import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(
    "mongodb://localhost:27017/next-event",
    { useUnifiedTopology: true }
  );
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes(
        "@" || !email || !name || name.trim() === "" || text.trim() === ""
      )
    ) {
      res.status(422).json({ message: "Invalid input" });
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    const result = await client
      .db()
      .collection("comments")
      .insertOne(newComment);
    newComment.id = result.insertedId;
    res.status(201).json({ message: "Comment Added", comment: newComment });
  } else if (req.method === "GET") {
    const db = client.db();
    const docs = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: docs });
  }
  client.close();
}
