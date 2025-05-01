import { api } from '@/services/api-client';
import NextAuth from 'next-auth';
// import { jwtDecode } from 'jwt-decode';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        // Replace this with your own authentication logic

        try {
          const res = await api.post('/login', {
            email: credentials?.email,
            password: credentials?.password,
          });

          return {
            accessToken: res.data.data.token,
            user: res.data.data.user,
          };
        } catch (e) {
          console.log(e);
          throw new Error('Invalid email or password');
        }
      },
    }),
  ],
  pages: {
    signIn: '/login', // Optional: Custom sign-in page
    error: '/login',
    newUser: '/sign-up',
    signOut: '/logout',
  },
  session: {
    strategy: 'jwt', // JWT is recommended for credentials
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, user }: { user: any; token: any }) {
      if (user) {
        console.log(user, 'user', token, 'token');
        return user;

        // token.accessToken = user.accessToken;
        // token.expiresIn = user.expiresIn;
        // token.tokenType = user.tokenType;
      }

      // if (token.accessToken) {
      //   // validate token
      //   const decodedToken = jwtDecode(token.accessToken);
      //   const { exp } = decodedToken;
      //   if (!exp) {
      //     return null;
      //   }
      //   if (Date.now() >= exp * 1000) {
      //     // token expired
      //     return null;
      //   }
      //   const userInfoRes = await api.get('/users/details', {
      //     headers: {
      //       Authorization: `Bearer ${token.accessToken}`,
      //     },
      //   });

      //   // temproraty parsing data

      //   token.user = {
      //     ...token.user,
      //     ...userInfoRes.data.data,
      //   };
      // }
      return token;
    },

    async session({ session, token }: any) {
      if (!token) return null;

      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        // expiresIn: token.expiresIn,
        // tokenType: token.tokenType,
        detail: token.user,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Set in your .env file
});

export { handler as GET, handler as POST };
