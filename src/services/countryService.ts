import { ICountryPreview } from '@/interfaces/country.interfaces';
const api = 'https://date.nager.at/api/v3';

export const fetchCountries = async (): Promise<ICountryPreview[]> => {
  const res = await fetch(`${api}/AvailableCountries`);
  if (!res.ok) {
    throw new Error('Failed to fetch countries');
  }
  return res.json();
};


