import { request } from '.';

export const getMunicipalities = () =>
  request({
    url: '/municipality',
  });

export const getMunicipalityByRegionCode = (id: string) =>
  request({
    url: `/municipality/by_region_code/${id}`,
  });
