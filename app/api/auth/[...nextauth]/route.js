import NextAuth from 'next-auth';
import GoogleProvider from 'naxt-auth/providers/google'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOLE_ID,
            clientSecret: process.env.GOOLE_CLIENT_SECRET,
        })
    ],
    async session({session}) {

    },
    async signIn({profile}){
        try {
            //serverLess function -> Lamda Function -> dynamodb (every it will call it will spinup the server and connect with our database)
            
        } catch (error) {
            
        }
    }
})

export {handler as GET, handler as POST}