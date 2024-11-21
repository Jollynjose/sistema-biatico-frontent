import { useQuery } from 'react-query';
import axios from 'axios';
import { User } from '@/interfaces/user';

const fetchUsers = async (): Promise<User[] | null> => {
	const url = '/api/user';

	try {
		const response = await axios.get(url);

		if (!response.data) {
			console.error('No data found in response');
			return null;
		}

		return response.data?.users;
	} catch (error) {
		console.error('Error fetching users:', error);
		return null;
	}
};

export default fetchUsers;

export const useUsers = () => {
	const { data, isLoading, error, refetch, isRefetching } = useQuery<User[] | null>(
		'users',
		fetchUsers,
		{ enabled: true }
	);

	return {
		users: data,
		isLoading,
		error,
		refetch,
		isRefetching
	};
};

