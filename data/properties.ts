import { firestore, getTotalPages } from "@/firebase/server";
import { Property } from "@/types/property";
import { PropertyStatus } from "@/types/propertyStatus";
import "server-only";

type GetPropertiesOptions = {
  filters?: {
    minPrice?: number | null;
    maxPrice?: number | null;
    minSquareMeters?: number | null;
    status?: PropertyStatus[] | null;
  };
  pagination?: {
    pageSize?: number;
    page?: number;
  };
};

export const getProperties = async (options?: GetPropertiesOptions) => {
  const page = options?.pagination?.page || 1;
  const pageSize = options?.pagination?.pageSize || 10;
  const { minPrice, maxPrice, minSquareMeters, status } =
    options?.filters || {};

  let propertiesQuery = firestore
    .collection("properties")
    .orderBy("updated", "desc");

  if (minPrice !== null && minPrice !== undefined) {
    propertiesQuery = propertiesQuery.where("price", ">=", minPrice);
  }

  if (maxPrice !== null && maxPrice !== undefined) {
    propertiesQuery = propertiesQuery.where("price", "<=", maxPrice);
  }

  if (minSquareMeters !== null && minSquareMeters !== undefined) {
    propertiesQuery = propertiesQuery.where(
      "square_meters",
      ">=",
      minSquareMeters
    );
  }

  // looking through array of statuses and retruning the one that matches our query
  if (status) {
    propertiesQuery = propertiesQuery.where("status", "in", status);
  }

  const totalPages = await getTotalPages(propertiesQuery, pageSize);

  const propertiesSnapshot = await propertiesQuery
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .get();

  const properties = propertiesSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Property)
  );

  return { data: properties, totalPages };
};

export const getPropertyById = async (propertyId: string) => {
  const propertySnapshot = await firestore
    .collection("properties")
    .doc(propertyId)
    .get();

  const propertyData = {
    id: propertySnapshot.id,
    ...propertySnapshot.data(),
  } as Property;

  return propertyData;
};
