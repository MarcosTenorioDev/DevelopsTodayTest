import { AxiosInterceptor } from "../interceptor/axios.interceptor";
import { ICountry, ICountryPreview, IFlag, IFlagResponse, PopulationResponse } from '@/interfaces/country.interfaces';

const axios = new AxiosInterceptor().getAxiosInstance();
const api = 'https://date.nager.at/api/v3';
const api2 ='https://countriesnow.space/api/v0.1/countries'

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

export const fetchCountriesFlags = async (): Promise<IFlagResponse> => {
  try {
    const response = await axios.get(`${api2}/flag/images`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries');
  }
};

export const fetchCountriesPopulation = async (): Promise<PopulationResponse> => {
  try {
    const response = await axios.get(`${api2}/population`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries');
  }
};

