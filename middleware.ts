// Withoutr a defined matcher, this one line applies next auth to the entire project
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/main/:path*",
  ],
};
