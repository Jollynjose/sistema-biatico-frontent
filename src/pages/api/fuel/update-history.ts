import { NextApiRequest, NextApiResponse } from 'next';
import { instance } from '@/shared/axiosInstance';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const response = await instance.post('/fuel-history/create', req.body);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
