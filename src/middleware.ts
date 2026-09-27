import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth?.user;
  const role = req.auth?.user?.role;

  // Protect student dashboard
  if (pathname.startsWith("/dashboard/student")) {
    if (!isLoggedIn) {
      const url = new URL("/login", req.nextUrl.origin);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    if (role !== "STUDENT" && role !== "CORE") {
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl.origin));
    }
  }

  // Protect core dashboard
  if (pathname.startsWith("/dashboard/core")) {
    if (!isLoggedIn) {
      const url = new URL("/login", req.nextUrl.origin);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    if (role !== "CORE") {
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl.origin));
    }
  }

  // Protect counsellor dashboard
  if (pathname.startsWith("/dashboard/counsellor")) {
    if (!isLoggedIn) {
      const url = new URL("/login", req.nextUrl.origin);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    if (role !== "COUNSELLOR") {
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl.origin));
    }
  }

  // If user is already logged in and visits /login, redirect to their role dashboard
  if (pathname === "/login" && isLoggedIn && role) {
    if (role === "STUDENT") {
      return NextResponse.redirect(new URL("/dashboard/student", req.nextUrl.origin));
    } else if (role === "CORE") {
      return NextResponse.redirect(new URL("/dashboard/core", req.nextUrl.origin));
    } else if (role === "COUNSELLOR") {
      return NextResponse.redirect(new URL("/dashboard/counsellor", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
