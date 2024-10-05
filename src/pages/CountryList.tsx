import { useEffect, useState } from 'react';
import { fetchCountries } from '@/services/country.service';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICountryPreview } from '@/interfaces/country.interfaces';

const CountryInfoPage = () => {
  const [countries, setCountries] = useState<ICountryPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countriesData = await fetchCountries();
        setCountries(countriesData);
      } catch (error) {
        console.error(error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  const navigateToDetails = (countryCode: string) => {
    navigate(`/countries/${countryCode}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Country List</h1>
      <Table>
        <TableCaption>A list of countries.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Country Name</TableHead>
            <TableHead>Country Code</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => (
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
              </TableRow>
            ))
          ) : (
            countries.map((country) => (
              <TableRow key={country.countryCode}>
                <TableCell className="font-semibold">{country.name}</TableCell>
                <TableCell>{country.countryCode}</TableCell>
                <TableCell className="text-right font-semibold">
                  <Button onClick={() => navigateToDetails(country.countryCode)}>Show details</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CountryInfoPage;
