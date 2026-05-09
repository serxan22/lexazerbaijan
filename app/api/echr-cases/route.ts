import { NextResponse } from "next/server";

type HudocResult = {
  itemid?: string;
  columns?: Record<string, string>;
};

function clean(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  const url = new URL("https://hudoc.echr.coe.int/app/query/results");
  url.searchParams.set(
    "query",
    `contentsitename:ECHR AND (languageisocode="ENG") AND (${q})`
  );
  url.searchParams.set(
    "select",
    "itemid,docname,doctypebranch,judgementdate,kpdate,kpdateAsText,conclusion,importance,appno,respondent,documentcollectionid"
  );
  url.searchParams.set("sort", "kpdate Descending");
  url.searchParams.set("start", "0");
  url.searchParams.set("length", "10");
  url.searchParams.set("rankingModelId", "11111111-0000-0000-0000-000000000000");

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
  const items: HudocResult[] = data?.results ?? [];

  return NextResponse.json({
    results: items.map((item) => {
      const columns = item.columns ?? {};
      const itemId = item.itemid || columns.itemid || "";

      return {
        id: itemId,
        caseName: clean(columns.docname) || "Untitled ECHR case",
        court: "European Court of Human Rights",
        dateFiled:
          clean(columns.kpdateAsText) ||
          clean(columns.judgementdate) ||
          clean(columns.kpdate) ||
          null,
        type:
          clean(columns.doctypebranch) ||
          clean(columns.documentcollectionid) ||
          "ECHR document",
        applicationNo: clean(columns.appno) || null,
        respondent: clean(columns.respondent) || null,
        conclusion: clean(columns.conclusion),
        importance: clean(columns.importance),
        absoluteUrl: itemId
          ? `https://hudoc.echr.coe.int/eng?i=${encodeURIComponent(itemId)}`
          : "https://hudoc.echr.coe.int/"
      };
    })
  });
}
