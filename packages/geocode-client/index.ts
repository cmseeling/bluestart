import ky from 'ky';
import * as os from 'node:os';
import { GeocodeResponse } from './GeocodeResponse';
import { NOMINATIM_API_URL } from './constants';

export const getGeocoding = async (queryString: string): Promise<GeocodeResponse> => {
  const params = new URLSearchParams({ q: queryString, format: 'jsonv2' });

  const headers = {
    'User-Agent': `${os.hostname()}/1.0`,
    Accept: 'application/json'
  };

  const response = await ky
    .get(NOMINATIM_API_URL, { searchParams: params, headers })
    .json<GeocodeResponse>();
  return response;
};
