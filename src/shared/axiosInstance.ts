import axios from "axios"
import https from "https"

export const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }) 
})