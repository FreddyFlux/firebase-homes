"use server";

import { auth, firestore } from "@/firebase/server";
import { propertyDataSchema } from "@/validation/propertySchema";

export const saveNewProperty = async (data: {
  adress1: string;
  adress2?: string;
  city: string;
  postcode: string;
  price: number;
  description: string;
  bedrooms: number;
  square_meters: number;
  status: "draft" | "for-sale" | "for-rent" | "sold" | "rented" | "withdrawn";
  token: string;
}) => {
  // seperating token from property data
  const { token, ...propertyData } = data;
  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "You are not authorized to access this resource.",
    };
  }

  const validation = propertyDataSchema.safeParse(propertyData);
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "An error occured",
    };
  }

  const property = await firestore.collection("properties").add({
    ...propertyData,
    created: new Date(),
    updated: new Date(),
  });

  return {
    propertyId: property.id,
  };
};
