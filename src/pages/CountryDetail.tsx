import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { CountryData, ICountry, IFlag } from '@/interfaces/country.interfaces';
import {
  fetchCountriesFlags,
  fetchCountriesPopulation,
  fetchCountryByCountryCode,
} from '@/services/country.service';
import { Table } from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PopulationChart from '@/components/PopulationChart';
import CountryPopulationChart from '@/components/PopulationChart';
import { ArrowLeftSquare } from 'lucide-react';

interface RouteParams extends Record<string, string | undefined> {
  countryCode: string;
}

const CoutryDetail = () => {
  const [country, setCountry] = useState<ICountry>();
  const [loading, setLoading] = useState(true);
  const [countryFlag, setCountryFlag] = useState<IFlag | undefined>(undefined);
  const [countryPopulation, setCountryPopulation] = useState<
    CountryData | undefined
  >(undefined);
  const params = useParams<RouteParams>();
  const { countryCode } = params;
  const navigate = useNavigate();

  if (!countryCode) {
    navigate('/');
    return <h1>Error: country code is missing</h1>;
  }

  useEffect(() => {
    const loadCountry = async () => {
      try {
        setLoading(true);
        const country = await fetchCountryByCountryCode(countryCode);
        setCountry(country);
      } catch (error) {
        console.error(error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadCountry();
  }, [countryCode]);

  useEffect(() => {
    const fetchCountryFlag = async () => {
      try {
        const flagsResponse = await fetchCountriesFlags();
        const flags = flagsResponse.data;
        if (country) {
          setCountryFlag(
            flags.find((flag) => flag.name === country?.commonName)
          );
        }
      } catch (error) {
      } finally {
      }
    };

    const fetchCountryPopulationData = async () => {
      try {
        const populationResponse = await fetchCountriesPopulation();
        const countriesPopulation = populationResponse.data;
        if (country) {
          const countryPopulationData = countriesPopulation.find(
            (populationData) => populationData.country === country.commonName
          );
          if (countryPopulationData) {
            setCountryPopulation(countryPopulationData);
          }
        }
      } catch (error) {
      } finally {
      }
    };

    fetchCountryPopulationData();
    fetchCountryFlag();
  }, [country]);

  if (!country) {
    return <h1>Error: country not found</h1>;
  }

  return (
    <div className="container mx-auto p-4">
      <Button variant={'link'} className="text-xl pl-0 mb-10 mt-4" onClick={() => navigate('/countries')}>
        {' '}
        <ArrowLeftSquare size={25} />
        Back to Country List
      </Button>
      <h1 className="text-5xl font-bold mb-4">Country Info</h1>
      <div className="mb-4">
        {loading ? (
          <div className="flex flex-row justify-between items-center">
            {' '}
            <div className="flex flex-col w-full gap-2">
              <Skeleton className="h-6 w-full max-w-[250px]" />
              <Skeleton className="h-6 w-full max-w-[400px]" />
              <Skeleton className="h-6 w-full max-w-[200px]" />
              <Skeleton className="h-6 w-full max-w-[350px]" />
            </div>
            <div>
              <Skeleton className="aspect-video h-48 rounded-lg" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              {' '}
              <h2 className="text-xl">Common Name: {country.commonName}</h2>
              <p>Official Name: {country.officialName}</p>
              <p>Country Code: {country.countryCode}</p>
              <p>Region: {country.region}</p>
            </div>

            {countryFlag && (
              <img
                className="aspect-video h-48 rounded-lg my-10"
                src={countryFlag?.flag}
                alt={country.commonName + 'flag'}
              />
            )}
          </div>
        )}
      </div>
      {loading ? (
        <Skeleton className="aspect-video w-full max-h-[500px] my-16 rounded-lg" />
      ) : (
        <>
          {' '}
          {countryPopulation && countryPopulation.populationCounts && (
            <CountryPopulationChart
              country={countryPopulation.country}
              code={countryPopulation.code}
              populationCounts={countryPopulation.populationCounts}
            />
          )}
        </>
      )}

      <h3 className="text-3xl font-semibold mt-10">Borders:</h3>
      <Table>
        <TableCaption>A list of countries.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Country Name</TableHead>
            <TableHead>Official Name</TableHead>
            <TableHead>Country Code</TableHead>
            <TableHead>Region</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ))
            : country.borders.map((border) => (
                <TableRow key={border.commonName}>
                  <TableCell className="font-semibold">
                    {border.commonName}
                  </TableCell>
                  <TableCell>{border.officialName}</TableCell>
                  <TableCell>{border.countryCode}</TableCell>
                  <TableCell>{border.region}</TableCell>
                  <TableCell className="text-right font-semibold">
                    <Button
                      onClick={() =>
                        navigate(`/countries/${border.countryCode}`)
                      }
                    >
                      Show details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CoutryDetail;
