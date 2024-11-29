import { NextApiRequest, NextApiResponse } from 'next';
import { instance } from '@/shared/axiosInstance';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const response = await instance.get('/job-position');
    res.status(200).json(response.data);
  }

  if (req.method === 'POST') {
    const response = await instance.post('/job-position', req.body);
    console.log(req.body);
    res.status(200).json(response.data);
  }
}
