import { request } from '.';

export const getAllUsers = async () => {
  return await request({
    url: '/user',
    method: 'GET',
  });
};

export const retrieveUsers = async () => {
  const response = await getAllUsers();

  return response.users ?? [];
};
