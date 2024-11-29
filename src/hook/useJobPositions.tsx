import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { JobPosition } from '@/interfaces/job-position';
import { request } from '@/api';

const fetchJobPositions = async (): Promise<JobPosition[] | null> => {
  const url = '/api/job-position';

  try {
    const response = await axios.get(url);

    if (!response.data) {
      console.error('No data found in response');
      return null;
    }

    return response.data?.job_positions;
  } catch (error) {
    console.error('Error fetching job positions:', error);
    return null;
  }
};

const createJobPosition = async (requestBody: {
  name: string;
  job_position_histories: Array<{
    lunch: number;
    breakfast: number;
    dinner: number;
    accommodation: number;
  }>;
}) => {
  const url = '/api/job-position';

  try {
    const response = await request({
      url: '/job-position/create',
      method: 'POST',
      data: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response);
  } catch (error) {
    console.error('Error creating job position:', error);
  }
};

export const useJobPositions = () => {
  const { data, isLoading, error, refetch, isRefetching } = useQuery(
    'jobPositions',
    fetchJobPositions,
  );

  const { mutateAsync: createJobPositionHandler, isLoading: isCreating } =
    useMutation({
      mutationFn: createJobPosition,
      onSuccess: () => refetch(),
    });

  return {
    jobPositions: data,
    isLoading,
    error,
    refetch,
    isRefetching,
    createJobPositionHandler,
    isCreating,
  };
};
