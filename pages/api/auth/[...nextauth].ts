import NextAuth from "next-auth"
import TwitchProvider from "next-auth/providers/twitch"
export default NextAuth({
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_ID,
      clientSecret: process.env.TWITCH_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
})
