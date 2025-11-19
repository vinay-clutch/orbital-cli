import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Preserve the incoming query string and redirect the browser to the auth server
  const url = new URL(request.url);
  const search = url.search; // includes leading '?'
  const forward = `http://localhost:3005/api/auth/callback/github${search}`;
  return NextResponse.redirect(forward);
}
