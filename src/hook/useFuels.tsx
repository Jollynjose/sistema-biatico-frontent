import { useQuery } from 'react-query';
import { Fuel } from '@/interfaces/fuel';
import axios from 'axios';

const fetchFuels = async (): Promise<Fuel[] | null> => {
	const url = '/api/fuel';

	try {
		const response = await axios.get(url);

		if (!response.data) {
			console.error('No data found in response');
			return null;
		}

		return response.data?.results;
	} catch (error) {
		console.error('Error fetching fuels:', error);
		return null;
	}
};

export default fetchFuels;

export const useFuels = () => {
	const { data, isLoading, error, refetch, isRefetching } = useQuery<Fuel[] | null>(
		'fuels',
		fetchFuels,
		{ enabled: true }
	);

	return {
		fuels: data,
		isLoading,
		error,
		refetch,
		isRefetching
	};
};

