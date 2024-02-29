import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {compare} from 'bcrypt';
import prismadb from '@/lib/prismadb';

import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import {PrismaAdapter} from '@next-auth/prisma-adapter'

export const authOptions: AuthOptions = {
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID || '', // To avoid Type errors we did a empty string as a else reference
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
        GoogleProvider({ 
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                }
            },
            async authorize(credentials) {
                // If User doesn't type anyting in Email and Password show Error Message
                if(!credentials?.email || !credentials?.password) {
                    throw new Error(`Email and Password required`);
                }

                // Query to find the User with his unqiue Email Adress, when found store it in user
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // If user not found throw Error 
                if(!user || !user.hashedPassword) {
                    throw new Error('Email does not exist');
                }

                // Check typed in Password using Bcrypt Hash function
                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

                // If password is Incorecct throw an error
                if (!isCorrectPassword) {
                    throw new Error('Incorrect Password');
                }
                
                // Return the Query Result which is a User Object
                return user;
            }
        })
    ],
    pages: {
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: 'jwt', // Session Token are created using JSON Web Token
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);