import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";

export function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/manage", "/(vi|en)/:path*"],
};
