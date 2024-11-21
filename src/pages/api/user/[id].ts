import { NextApiRequest, NextApiResponse } from 'next'
import { instance } from '@/shared/axiosInstance'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  if (req.method === 'GET') {
    try {
      const response = await instance.get(`/user/${id}`);
      return res.status(200).json(response.data);
    } catch (error) {
      console.error('GET error:', error);
      return res.status(500).json({ message: 'Error fetching user data' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const response = await instance.put(`/user/${id}`, req.body);
      return res.status(200).json(response.data);
    } catch (error) {
		
      console.error('PUT error:', error);
      return res.status(500).json({ message: 'Error updating user' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
