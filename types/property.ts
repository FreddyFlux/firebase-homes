import { PropertyStatus } from "./propertyStatus";

export type Property = {
  id: string;
  address1: string;
  address2?: string;
  city: string;
  postcode: string;
  price: number;
  bedrooms: number;
  description: string;
  square_meters: number;
  status: PropertyStatus;
};
