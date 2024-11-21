import { NextApiRequest, NextApiResponse } from 'next'
import { instance } from '@/shared/axiosInstance'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const response = await instance.get('/user/')
		res.status(200).json(response.data)
	} else {
		res.status(405).json({ message: 'Method not allowed' })
	}

	if (req.method === 'POST') {
		const response = await instance.post('/user/', req.body)
		res.status(200).json(response.data)
	}
}