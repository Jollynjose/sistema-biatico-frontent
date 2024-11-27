import { NextApiRequest, NextApiResponse } from 'next';
import { instance } from '@/shared/axiosInstance';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (req.method === 'GET' && id) {
    const response = await instance.get(`/job-position/${id}`);
    res.status(200).json(response.data);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }

  if (req.method === 'PUT' && id) {
    try {
      const response = await instance.put(`/job-position/${id}`, req.body);
      res.status(200).json(response.data);
    } catch {
      res.status(500).json({ message: 'Error updating fuel' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
