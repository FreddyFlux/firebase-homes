"use server";

import { auth } from "@/firebase/server";
import { cookies } from "next/headers";

export const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("firebaseAuthToken");
  cookieStore.delete("firebaseAuthRefreshToken");
};

// Server action to set the token and refresh token in cookies
export const setToken = async ({
  token,
  refreshToken,
}: {
  token: string;
  refreshToken: string;
}) => {
  try {
    // Check if / verify the token
    const verifiedToken = await auth.verifyIdToken(token);
    if (!verifiedToken) {
      return;
    }

    // Get user record and set custom claims if admin
    const userRecord = await auth.getUser(verifiedToken.uid);
    if (
      process.env.ADMIN_EMAIL === userRecord.email &&
      !userRecord.customClaims?.admin
    ) {
      auth.setCustomUserClaims(verifiedToken.uid, {
        admin: true,
      });
    }

    // Set the token and refresh token in cookies
    const cookieStore = await cookies();
    cookieStore.set("firebaseAuthToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    cookieStore.set("firebaseAuthRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {
    console.error(error);
  }
};
