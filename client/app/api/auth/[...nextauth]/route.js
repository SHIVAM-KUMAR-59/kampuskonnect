import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import api from "@/utils/axios";


export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Name", type: "text", placeholder: "John Doe" },
//         email: { label: "Email", type: "text", placeholder: "email@example.com" },
//         password: { label: "Password", type: "password" },
//         isSignup: { label: "Is Signup", type: "text" }, // "true" | "false"
//       },

//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) return null;

//         const isSignup = credentials.isSignup === "true";

//         if (isSignup && !credentials.username) return null;

//         const url = isSignup ? `auth/signup` : `auth/login`;

//         try {
//           const res = await api.post(`${process.env.BACKEND_BASE_URL}/api/${url}`, {
//             username: credentials.username,
//             email: credentials.email,
//             password: credentials.password,
//           });

//           if (!res || !res.data) return null;

//           const data: LoginResponse = res.data.result;

//           if (!data?.token) return null;

//           return {
//             id: data.user.id,
//             email: data.user.email,
//             username: data.user.username,
//             token: data.token,
//           };
//         } catch (error) {
          
//           // Handle Axios errors properly
//           if (error instanceof AxiosError) {

//             const errorMessage = 
//               error.response?.data?.message || 
//               error.response?.data?.error || 
//               error.message || 
//               "Authentication failed";
            
//             throw new Error(errorMessage);
//           }
          
//           // Handle other errors
//           throw new Error("Something went wrong during authentication");
//         }
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user?: User }) {
//       // initial login
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.username = (user as CustomUser).username;
//         token.accessToken = (user as CustomUser).token;
//       }
//       return token;
//     },

//     async session({ session, token }: { session: Session; token: JWT }) {
//       if (token.id && token.email && token.username) {
//         session.user.id = token.id;
//         session.user.email = token.email;
//         session.user.username = token.username;
//       }
//       if (token.accessToken) {
//         session.accessToken = token.accessToken as string;
//       }
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login", // redirect user here if not logged in
//   },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" },
            },

            async authorize (credentials) {
                
                if (!credentials.email || !credentials.password) {
                    return null;
                }

                try {
                    const response = await api.post("/auth/login", {
                        email: credentials.email,
                        password: credentials.password
                    });

                    if (!response || !response.data) {
                        return null;
                    }

                    const data = response.data.result;

                    if (!data?.token) {
                        return null;
                    }

                    return {
                        id: data.user.id,
                        email: data.user.email,
                        username: data.user.username,
                        token: data.token
                    };
                } catch (error) {
                    // Handle Axios errors properly
                    if (error instanceof AxiosError) {
                        const errorMessage = 
                        error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        "Authentication failed";
                        throw new Error(errorMessage);
                    }
                    
                    // Handle other errors
                    throw new Error("Something went wrong during authentication")
                }
            }
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
          console.log(account, profile);
            if (account.provider === "google") {
                return profile.email_verified && profile.email.endsWith("@kiit.ac.in");
            }
            return false;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };