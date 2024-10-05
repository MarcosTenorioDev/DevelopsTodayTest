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

export interface IFlag{
    name:string,
    flag:string,
    iso2:string,
    iso3:string
}
export interface IFlagResponse{
    error:boolean,
    msg:string,
    data:IFlag[]
}