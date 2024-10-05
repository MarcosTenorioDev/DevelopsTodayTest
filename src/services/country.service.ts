import { AxiosInterceptor } from "../interceptor/axios.interceptor";
import { ICountry, ICountryPreview } from '@/interfaces/country.interfaces';

const axios = new AxiosInterceptor().getAxiosInstance();
const api = 'https://date.nager.at/api/v3';

export const fetchCountries = async (): Promise<ICountryPreview[]> => {
  try {
    const response = await axios.get(`${api}/AvailableCountries`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries');
  }
};

export const fetchCountryByCountryCode = async (countryCode:string): Promise<ICountry> => {
  try {
    const response = await axios.get(`${api}/CountryInfo/${countryCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries');
  }
};


