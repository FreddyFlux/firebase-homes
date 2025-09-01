"use server";

import { auth, firestore } from "@/firebase/server";
import { Property } from "@/types/property";
import { propertyDataSchema } from "@/validation/propertySchema";

export const updateProperty = async (data: Property, authToken: string) => {
  // seperating token from property data
  const { id, ...propertyData } = data;
  const verifiedToken = await auth.verifyIdToken(authToken);
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

  await firestore
    .collection("properties")
    .doc(id)
    .update({
      ...propertyData,
      updated: new Date(),
    });
};
