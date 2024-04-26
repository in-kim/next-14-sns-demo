import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import {NextResponse} from "next/server";

export const {
  handlers: { GET, POST },
  auth, signIn,
} = NextAuth({
  pages:{
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
  callbacks: {
    async authorized({ request, auth }) {
      if (!auth) {
        console.log("??")
        // return NextResponse.redirect(`http://localhost:3000/i/flow/login`)
      }
      return true;
    }
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: credentials.id,
            password: credentials.password
          }),
        })

        // 로그인 실패
        if (!authResponse.ok) {
          return null
        }

        // 로그인 성공
        const user = await authResponse.json()

        return {
          email: user.id,
          name: user.nickname,
          image: user.Image,
        }
      },
    }),
  ],
})
