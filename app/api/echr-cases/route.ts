import { NextResponse } from "next/server";

type HudocItem = {
  itemid?: string;
  docname?: string;
  doctypebranch?: string;
  judgementdate?: string;
  conclusion?: string;
  importance?: string;
  appno?: string;
  respondent?: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  const url = new URL("https://hudoc.echr.coe.int/app/query/results");
  url.searchParams.set("query", q);
  url.searchParams.set("select", "itemid,docname,doctypebranch,judgementdate,conclusion,importance,appno,respondent");
  url.searchParams.set("sort", "kpdate Descending");
  url.searchParams.set("start", "0");
  url.searchParams.set("length", "10");
  url.searchParams.set("languageisocode", "ENG");

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json"
    },
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch ECHR cases" },
      { status: response.status }
    );
  }

  const data = await response.json();
  const items: HudocItem[] = data?.results ?? [];

  return NextResponse.json({
    results: items.map((item) => ({
      id: item.itemid,
      caseName: item.docname || "Untitled ECHR case",
      court: "European Court of Human Rights",
      dateFiled: item.judgementdate || null,
      type: item.doctypebranch || "ECHR document",
      applicationNo: item.appno || null,
      respondent: item.respondent || null,
      conclusion: item.conclusion || "",
      importance: item.importance || "",
      absoluteUrl: item.itemid
        ? `https://hudoc.echr.coe.int/eng?i=${item.itemid}`
        : "https://hudoc.echr.coe.int/"
    }))
  });
}
