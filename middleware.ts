// Withoutr a defined matcher, this one line applies next auth to the entire project
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/wallet/:path*",
    "/chat/:path*",
    "/settings/:path*",
    "/events/:path*",
    "/connect/:path*",
    "/notifications/:path*",
    "/account/:path*",
  ],
};
