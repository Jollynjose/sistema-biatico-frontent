import { request } from '.';

export const getTravelExpensePdf = async (travelExpenseId: string) => {
  return request({
    url: '/pdf-generator/travel-expense/' + travelExpenseId,
    method: 'GET',
  });
};
