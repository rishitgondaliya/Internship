import clientPromise from "../../lib/db.util";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, name, message } = req.body;

  // Basic input validation
  if (
    !email ||
    !email.includes("@") ||
    !name ||
    name.trim() === "" ||
    !message ||
    message.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid input" });
  }

  const newMessage = {
    email,
    name,
    message,
    createdAt: new Date(),
  };

  try {
    const client = await clientPromise;
    const db = client.db(); // Uses DB from connection URI

    const result = await db.collection("messages").insertOne(newMessage);

    return res.status(201).json({
      message: "Message stored successfully",
      data: { id: result.insertedId, ...newMessage },
    });
  } catch (error) {
    console.error("MongoDB error:", error);
    return res.status(500).json({ message: "Storing message failed!" });
  }
}
