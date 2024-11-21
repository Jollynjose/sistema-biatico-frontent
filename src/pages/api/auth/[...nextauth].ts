import { instance } from "@/shared/axiosInstance"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"

interface Credentials {
	email: string
	password: string
}

interface UserResponse {
	id: string,
	token: string
}

const credentials = {
	password: {
		label: "Password",
		type: "password",
		placeholder: "Pass123!"
	},
	email: {
		label: "Email",
		type: "email",
		placeholder: "Jollynnnn@gmail.com"
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials,
			authorize: async (credentials: Credentials) => {
				try {
					const res = await instance.post('/auth/sign-in', credentials)
					const user: UserResponse = res.data

					console.log('user:', user)

					if (user) {
						return user
					}
				} catch (error) {
					console.error('Error during authorization:', error)
				}
				return null
			}
		})
	],
	callbacks: {
		async jwt({ token, user }: { token: JWT, user?: UserResponse }) {
			if (user) {
				token.accessToken = user.token
			}
			return token
		},
		async session({ session, token }: { session: any, token: JWT }) {
			session.accessToken = token.accessToken
			return session
		}
	},
	pager: { signIn: "/auth/signin" },
	session: { strategy: "jwt" },
	secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)

