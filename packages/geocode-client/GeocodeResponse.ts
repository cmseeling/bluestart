export type Address = {
  city: string;
  state_district: string;
  state: string;
  'ISO3166-2-lvl4': string;
  postcode: string;
  country: string;
  country_code: string;
};

export type GeocodeResponse = {
  place_id: number;
  osm_type: string;
  osm_id: number;
  boundingbox: number[];
  lat: string;
  lon: string;
  category: string;
  type: string;
  display_name: string;
  address: Address;
  extratags: Record<string, string>;
  namedetails: Record<string, string>;
};
