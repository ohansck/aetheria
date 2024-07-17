import { pagesOptions } from "@/app/api/auth/[...nextauth]/pages-options";
import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export default withAuth({
  pages: {
    ...pagesOptions,
  },
});

export const config = {
  // restricted routes
  matcher: [
    "/",
    "/analytics",
    "/logistics/:path*",
    "/ecommerce/:path*",
    "/support/:path*",
    "/file/:path*",
    "/file-manager",
    "/invoice/:path*",
    "/forms/profile-settings/:path*",
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
  ],
};

const cookieName = "i18next";

export function middleware(req: any) {
  if (
    // req.nextUrl.pathname.indexOf('icon') > -1 ||
    req.nextUrl.pathname.indexOf("chrome") > -1
  )
    return NextResponse.next();
  let lang;

  if (req.cookies.has(cookieName)) lang = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lang) lang = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lang) lang = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((local) => req.nextUrl.pathname.startsWith(`/${local}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(new URL(`/${lang}${req.nextUrl.pathname}`, req.url));
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
