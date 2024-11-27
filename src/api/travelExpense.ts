import {
  TravelExpenseResult,
  TravelExpense,
} from '@/interfaces/travelExpenses';
import { request } from '.';

const PostTravelExpense = async (data: any) => {
  const response = await request({
    url: '/travel-expense/create',
    method: 'POST',
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const createTravelExpense = async (
  data: any,
): Promise<TravelExpense> => {
  try {
    const response: TravelExpenseResult = await PostTravelExpense(data);
    return response.result;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};
