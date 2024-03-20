import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOLE_ID,
            clientSecret: process.env.GOOLE_CLIENT_SECRET,
        })
    ],
    async session({session}) {
        const sessionUser = await User.findOne({
            email: session.user.email
        })
        session.user.id = sessionUser._id.toString();
        return session;
    },
    async signIn({profile}){
        try {
            //serverLess function -> Lamda Function -> dynamodb (everytime it will call it will spinup the server and connect with our database)
            await connectToDB();

            //? if a user already exists
            const userExists = await User.findOne({email : profile.email});
            //? if not, create a new user
            if(!userExists){
                await User.create({
                    email : profile.email,
                    username: profile.name.replace(" ","").toLowerCase(),
                    image: profile.picture
                })
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
})

export {handler as GET, handler as POST}