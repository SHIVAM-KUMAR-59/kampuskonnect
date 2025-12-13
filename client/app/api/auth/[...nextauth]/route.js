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
          response_type: "code",
        },
      },
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
          response_type: "code",
        },
      },
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
          response_type: "code",
        },
      },
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        try {
          const res = await axios.post(
            `${process.env.BACKEND_URL}/api/v1/auth/user/credentials/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          const data = res.data;

          if (!data?.user?.token) {
            throw new Error("Invalid response from server");
          }

          return {
            id: data.user.user.id,
            email: data.user.user.email,
            username: data.user.user.username,
            role: data.user.user.role,
            token: data.user.token,
          };
        } catch (err) {
          // Forward the actual error message from backend
          const errorMessage =
            err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            "Invalid email or password";
          throw new Error(errorMessage);
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
          const res = await axios.post(`${process.env.BACKEND_URL}/api/v1/auth/user/google/login`, {
            email,
            googleLogin: true,
          });
          console.log("Login data", res.data);
          account.user = res.data.user.user;
          account.token = res.data.user.token;
          return true;
        }

        // Google Register Student
        if (account.provider === "google-register-student") {
          const res = await axios.post(`${process.env.BACKEND_URL}/api/v1/auth/student/register`, {
            name,
            profileImage: profile?.picture,
            email,
            googleSignup: true,
          });
          console.log("Student google", res.data);
          account.user = res.data.student.user;
          account.token = res.data.student.token;
          return true;
        }

        // Google Register Alumni
        if (account.provider === "google-register-alumni") {
          const res = await axios.post(`${process.env.BACKEND_URL}/api/v1/auth/alumni/register`, {
            name,
            email,
            profileImage: profile?.picture,
            googleSignup: true,
          });
          console.log("Alumni google", res.data);
          account.user = res.data.alumni.user;
          account.token = res.data.alumni.token;
          return true;
        }

        return true;
      } catch (err) {
        console.error("SignIn error:", err);
        // Forward the actual error message from backend
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Authentication failed";
        throw new Error(errorMessage);
      }
    },

    async jwt({ token, account, user, trigger }) {
      // Initial sign in - account exists
      if (account?.user) {
        return {
          ...token,
          role: account.user.role,
          id: account.user._id || account.user.id,
          email: account.user.email,
          username: account.user.username || account.user.name,
          accessToken: account.token,
        };
      }

      // Credentials provider - user exists
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          accessToken: user.token,
        };
      }

      // Subsequent calls - return existing token as-is
      return token;
    },

    async session({ session, token }) {
      console.log("Session callback token:", token);
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
