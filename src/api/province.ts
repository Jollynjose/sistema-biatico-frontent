import { request } from '.';

export const getProvinces = () =>
  request({
    url: '/province',
  });

export const retrieveProvinces = async () => {
  const response = await getProvinces();

  return response?.results ?? [];
};
