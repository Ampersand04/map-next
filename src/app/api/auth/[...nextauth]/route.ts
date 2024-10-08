import { handlers } from '@/auth';
export const { GET, POST } = handlers;

// import axios from 'axios';
// import NextAuth, { NextAuthOptions } from 'next-auth';

// import Credentials from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';

// // Настройка провайдера Google
// export const authOptions: NextAuthOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         }),
//         // Credentials({
//         //     name: 'Credentials',
//         //     credentials: {
//         //         email: { label: 'Email', type: 'text' },
//         //         password: { label: 'Password', type: 'password' },
//         //     },
//         //     async authorize(credentials) {
//         //         try {
//         //             const response = await axios.post(`${process.env.API_URL}/auth/login`, {
//         //                 email: credentials?.email,
//         //                 password: credentials?.password,
//         //             });
//         //             return response.data; // Возвращаем пользователя, если авторизация успешна
//         //         } catch (error) {
//         //             if (error instanceof Error) {
//         //                 throw new Error(error.message); // Или обработка конкретного свойства
//         //             } else {
//         //                 throw new Error('An unknown error occurred');
//         //             }
//         //         }
//         //         // const user = await prisma.user.findUnique({
//         //         //     where: { email: credentials?.email },
//         //         // });

//         //         // if (
//         //         //     user &&
//         //         //     credentials?.password &&
//         //         //     (await compare(credentials.password, user.password))
//         //         // ) {
//         //         //     return user;
//         //         // } else {
//         //         //     throw new Error('Invalid email or password');
//         //         // }
//         //     },
//         // }),
//     ],
//     pages: {
//         signIn: '/auth/signin',
//         error: '/auth/error',
//     },
//     callbacks: {
//         // async signIn({ user, account }) {
//         //     // if (account?.provider === 'google') {
//         //     try {
//         //         const response = await axios.post(`${process.env.API_URL}/auth/check-user`, {
//         //             email: user.email,
//         //         });
//         //         const existingUser = response.data;

//         //         if (!existingUser) {
//         //             await axios.post(`${process.env.API_URL}/auth/create-user`, {
//         //                 fullname: user.name,
//         //                 email: user.email,
//         //                 googleId: user.id,
//         //                 role: 'USER',
//         //             });
//         //         }
//         //         return true;
//         //     } catch (error) {
//         //         if (error instanceof Error) {
//         //             console.error(error.message);
//         //         }
//         //         return '/auth/error';
//         //     }
//         //     // }
//         //     // const existingUser = await prisma.user.findUnique({
//         //     //     where: { email: user.email },
//         //     // });

//         //     // if (!existingUser) {
//         //     //     await prisma.user.create({
//         //     //         data: {
//         //     //             fullname: user.name,
//         //     //             email: user.email,
//         //     //             googleId: user.id,
//         //     //             role: 'USER',
//         //     //         },
//         //     //     });
//         //     // }

//         //     // return true;
//         // },
//         async redirect({ url, baseUrl }) {
//             // if (token?.role === 'ADMIN') {
//             //     return '/dashboard';
//             // } else if (token?.role === 'USER' || token?.role === 'MANAGER') {
//             //     return '/map';
//             // }
//             return baseUrl;
//         },

//         async session({ session, token }) {
//             // if (token && session.user) {
//             //     session.user.id = token.id; // Проверяем, что session.user не undefined
//             //     session.user.role = token.role;
//             // }
//             return session;
//         },
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id;
//                 // token.role = user.role;
//             }
//             return token;
//         },
//     },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
