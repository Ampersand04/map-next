import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
import bcrypt from "bcrypt";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { userService } from "./service/user.service";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (!validatedFields.success) {
                    throw new Error("Invalid input data");
                }

                const { email, password } = validatedFields.data;

                try {
                    // Fetch user from your database or service
                    const user = await userService.getUserByEmail(email);

                    if (!user || !user.password) {
                        throw new Error("No user found with the email");
                    }

                    // Compare password
                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (passwordMatch) {
                        return user;
                    }

                    return null;
                } catch (error) {
                    console.error(error);
                    throw new Error("Authentication failed");
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        // signIn: '/auth/login',
        // другие страницы
    },
} satisfies NextAuthConfig;
