import { request } from '.';

export const getAllRegions = () =>
  request({
    url: '/region/a',
    method: 'GET',
  });
