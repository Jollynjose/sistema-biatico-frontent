import { useQuery } from 'react-query';
import axios from 'axios';
import { JobPosition } from '@/interfaces/job-position';

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

export const useJobPositions = () => {
  const { data, isLoading, error, refetch, isRefetching } = useQuery(
    'jobPositions',
    fetchJobPositions,
  );

  return {
    jobPositions: data,
    isLoading,
    error,
    refetch,
    isRefetching,
  };
};
