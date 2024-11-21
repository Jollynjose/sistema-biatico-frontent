import { NextApiRequest, NextApiResponse } from 'next';
import { instance } from '@/shared/axiosInstance';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { email, password, first_name, last_name, role, job_position_id } = req.body;

	try {
		const response = await instance.post('/auth/sign-up', { email, password, first_name, last_name, role, job_position_id });
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json({ message: (error as Error).message });
	}
}