import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export default function middleware(req: NextRequest) {
  const loggedin = req.cookies.get("userToken");
  const { pathname } = req.nextUrl;

  if (!loggedin && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (loggedin && pathname === "/login") {
    return NextResponse.redirect(new URL(`/`, req.url));
  }

  // Check if the user's designation is not 'company' and redirect them away from certain routes
  const decodedToken = loggedin ? jwt.decode(loggedin.value) as { role?: string } : null;
  
  if (
    decodedToken?.role !== "company" &&
    ["/game", "/transaction/all", "/clients/all", "/add-game"].includes(pathname)
  ) {
    return NextResponse.redirect(new URL(`/`, req.url));
  }

  // For any other cases return
  return NextResponse.next();
}

export const config = { matcher: "/((?!api|static|.*\\..*|_next).*)" };
