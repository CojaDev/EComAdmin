import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../../lib/mongodb';
import Store from '../../../models/Store';
import { mongooseConnect } from '../../../../lib/mongoose';
let emails = [];
const adminEmails = async () => {
  try {
    await mongooseConnect();
    const store = await Store.findOne();
    emails = store.admins.map((admin) => admin.email);
  } catch (error) {
    console.error('Error fetching admin emails:', error);
    return [];
  }
};
await adminEmails();

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    session: ({ session, token, user }) => {
      if (emails.includes(session?.user?.email)) {
        return session;
      } else if (session?.user?.email === 'amarcetic04@gmail.com') {
        return session;
      } else {
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
