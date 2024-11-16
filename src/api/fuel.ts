import { request } from '.';

export const getAllFuel = async () =>
  request({
    url: '/fuel',
    method: 'GET',
  });

export const retrieveFuel = async () => {
  const response = await getAllFuel();

  return response.results ?? [];
};
