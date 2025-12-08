import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import axios from "axios";

export const authOptions = {
  providers: [
    // Google Login Provider
    GoogleProvider({
      id: "google-login",
      name: "Google Login",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),

    // Google Register Student Provider
    GoogleProvider({
      id: "google-register-student",
      name: "Google Register Student",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),

    // Google Register Alumni Provider
    GoogleProvider({
      id: "google-register-alumni",
      name: "Google Register Alumni",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;

        try {
          const res = await axios.post(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          const data = res.data;

          if (!data?.token) return null;

          return {
            id: data.user.id,
            email: data.user.email,
            username: data.user.username,
            token: data.token,
          };
        } catch (err) {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) return false;

      const email = profile?.email;
      const name = profile?.name;

      try {
        // Google Login
        if (account.provider === "google-login") {
          const res = await axios.post(
            `${process.env.BACKEND_URL}/api/v1/auth/login`,
            { 
              email, 
              googleLogin: true 
            }
          );

          // Handle login response structure
          account.user = res.data.user;
          account.token = res.data.token;
          return true;
        }

        // Google Register Student
        if (account.provider === "google-register-student") {
          const res = await axios.post(
            `${process.env.BACKEND_URL}/api/v1/auth/student/register`,
            {
              name,
              email,
              googleSignup: true,
            }
          );

          // Handle student registration response structure
          // Response: { student: { user: {...}, token: "..." }, success: true }
          account.user = res.data.student.user;
          account.token = res.data.student.token;
          return true;
        }

        // Google Register Alumni
        if (account.provider === "google-register-alumni") {
          const res = await axios.post(
            `${process.env.BACKEND_URL}/api/v1/auth/alumni/register`,
            {
              name,
              email,
              googleSignup: true,
            }
          );

          // Handle alumni registration response structure
          // Assuming similar structure: { alumni: { user: {...}, token: "..." }, success: true }
          account.user = res.data.alumni.user;
          account.token = res.data.alumni.token;
          return true;
        }

        return true;
      } catch (err) {
        console.error("SignIn error:", err);
        throw new Error(err.response?.data?.message || "Authentication failed");
      }
    },

    async jwt({ token, account, user }) {
      if (account?.user) {
        token.id = account.user._id || account.user.id;
        token.email = account.user.email;
        token.username = account.user.username || account.user.name;
        token.accessToken = account.token;
      }
      
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.accessToken = user.token;
      }
      
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;
      session.accessToken = token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };