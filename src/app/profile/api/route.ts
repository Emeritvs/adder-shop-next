import { type NextRequest } from "next/server";
import { headers, cookies } from 'next/headers';

export async function GET(request : NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const headerList = headers();
  const theme = request.cookies.get('theme');

  cookies().set("resultsPerPage", "20");
  
  return new Response("<h1>Profile API data<h1>", { 
    headers: { 
      "Content-Type": "text/html", 
      "Set-Cookie": "theme=dark",
    }
  });
}