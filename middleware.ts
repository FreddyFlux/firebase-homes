import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";

export async function middleware(request: NextRequest) {
  console.log("MIDDLEWARE: ", request.url);
  if (request.method === "POST") {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;
  console.log("Raw token from cookie:", token);
  console.log("Token type:", typeof token);
  console.log("Token length:", token?.length);
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const decodedToken = decodeJwt(token);
    console.log("Decoded token:", decodedToken);
    console.log("Token admin property:", decodedToken.admin);
    console.log("Token customClaims:", decodedToken.customClaims);
    if (!decodedToken.admin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.log("JWT decode error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard"],
};
