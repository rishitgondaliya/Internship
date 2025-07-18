import { hashPassword } from "@/lib/auth";
import ConnectDB from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { email, password } = req.body;
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 6
  ) {
    return res.status(422).json({
      message: "Invalid Input - password must be at least 6 characters long",
    });
  }
  const client = await ConnectDB();
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });
  if (existingUser) {
    client.close();
    return res
      .status(422)
      .json({ message: "User with the same email exists already.!" });
  }

  const hashedPassword = await hashPassword(password);
  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  if (result) {
    client.close();
    res.status(201).json({ message: "User created successfully." });
  }
}
