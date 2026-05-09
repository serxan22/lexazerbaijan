import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  const token = process.env.COURTLISTENER_API_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "COURTLISTENER_API_TOKEN is missing" },
      { status: 500 }
    );
  }

  const url = new URL("https://www.courtlistener.com/api/rest/v4/search/");
  url.searchParams.set("q", q);
  url.searchParams.set("type", "o");
  url.searchParams.set("order_by", "score desc");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Token ${token}`
    },
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch cases" },
      { status: response.status }
    );
  }

  const data = await response.json();

  return NextResponse.json({
    results: (data.results ?? []).map((item: any) => ({
      id: item.id,
      caseName: item.caseName || item.caseNameFull || "Untitled case",
      court: item.court || "Unknown court",
      dateFiled: item.dateFiled || null,
      snippet: item.snippet || item.plain_text || "",
      absoluteUrl: item.absolute_url
        ? `https://www.courtlistener.com${item.absolute_url}`
        : "https://www.courtlistener.com/"
    }))
  });
}
