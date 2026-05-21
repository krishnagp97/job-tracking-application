import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";


// it handle all middleware logics and function name  must proxy only
export default async function proxy(request: NextRequest) {
  const isDashedboardPage = request.nextUrl.pathname.startsWith("/dashboard");
  const session = await getSession();
  if (isDashedboardPage && !session?.user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  const isSignInPage = request.nextUrl.pathname.startsWith("/sign-in");
  const isSignUpPage = request.nextUrl.pathname.startsWith("/sign-up");

 if ((isSignInPage || isSignUpPage) && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}
