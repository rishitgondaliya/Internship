import { hashPassword, ValidatePassword } from "@/lib/auth";
import ConnectDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Not Authenticated" });
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPass;
  const newPassword = req.body.newPass;

  const client = await ConnectDB();
  const user = await client
    .db()
    .collection("users")
    .findOne({ email: userEmail });

  if (!user) {
    client.close();
    return res.status(404).json({ message: "User not found" });
  }

  const currentPassword = user.password;
  const isValidPass = await ValidatePassword(oldPassword, currentPassword);

  if (!isValidPass) {
    client.close();
    return res.status(403).json({ message: "Unauthorized.!" });
  }

  const hashedPassword = await hashPassword(newPassword);
  const result = await client
    .db()
    .collection("users")
    .updateOne({ email: userEmail }, { $set: { password: hashedPassword } });

  client.close();
  return res.status(200).json({ message: "Password updated successfully." });
}
