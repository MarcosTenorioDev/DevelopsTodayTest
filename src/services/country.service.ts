import { AxiosInterceptor } from "../interceptor/axios.interceptor";
import { ICountry, ICountryPreview, IFlagResponse, PopulationResponse } from '@/interfaces/country.interfaces';

const axios = new AxiosInterceptor().getAxiosInstance();
const api = import.meta.env.VITE_API;

export const fetchCountries = async (): Promise<ICountryPreview[]> => {
  try {
    const response = await axios.get(`${api}/api/countries`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries');
  }
};

export const fetchCountryByCountryCode = async (countryCode:string): Promise<ICountry> => {
  try {
    const response = await axios.get(`${api}/api/country/${countryCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries');
  }
};

export const fetchCountriesFlags = async (): Promise<IFlagResponse> => {
  try {
    const response = await axios.get(`${api}/api/countries/flags`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries');
  }
};

export const fetchCountriesPopulation = async (): Promise<PopulationResponse> => {
  try {
    const response = await axios.get(`${api}/api/countries/population`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries');
  }
};

