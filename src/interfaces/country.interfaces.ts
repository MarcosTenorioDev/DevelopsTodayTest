export interface ICountryPreview {
  name: string;
  countryCode: string;
}

export interface IBorder {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: IBorder[] | null;
}

export interface ICountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: IBorder[];
}
