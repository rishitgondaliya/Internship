import { ValidatePassword } from "@/lib/auth";
import ConnectDB from "@/lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await ConnectDB();

        const userCollection = client.db().collection("users");
        const user = await userCollection.findOne({ email: credentials.email });
        if (!user) {
          client.close();
          throw new Error("No user found !");
        }

        const isValidPassword = await ValidatePassword(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          client.close();
          throw new Error("Invalid credentials !");
        }

        client.close();

        return {
          email: user.email,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
