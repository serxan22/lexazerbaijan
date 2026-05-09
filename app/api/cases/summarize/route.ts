import { NextResponse } from "next/server";
import Groq from "groq-sdk";

async function fetchCourtListenerText(url: string, token: string) {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`
      }
    });

    if (!response.ok) return "";

    const data = await response.json();

    return (
      data.plain_text ||
      data.html ||
      data.html_lawbox ||
      data.html_columbia ||
      ""
    );
  } catch {
    return "";
  }
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function POST(request: Request) {
  const body = await request.json();

  const title = String(body.title || "");
  const court = String(body.court || "");
  const date = String(body.date || "");
  const citation = String(body.citation || "");
  const topic = String(body.topic || "");
  const text = String(body.text || "");
  const sourceUrl = String(body.sourceUrl || "");

  if (!title || title.length < 2) {
    return NextResponse.json(
      { error: "Case title is required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.GROQ_API_KEY;
  const courtListenerToken = process.env.COURTLISTENER_API_TOKEN;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GROQ_API_KEY is missing." },
      { status: 500 }
    );
  }

  let fullText = text;

  if (
    sourceUrl.includes("courtlistener.com") &&
    courtListenerToken
  ) {
    const apiUrl = sourceUrl
      .replace("https://www.courtlistener.com", "https://www.courtlistener.com/api/rest/v4")
      .replace(/\/$/, "");

    const fetched = await fetchCourtListenerText(
      apiUrl,
      courtListenerToken
    );

    if (fetched) {
      fullText = stripHtml(fetched).slice(0, 12000);
    }
  }

  if (!fullText || fullText.trim().length < 400) {
    return NextResponse.json({
      summary:
        "LexAI could not generate a reliable summary because the full judicial opinion was not available from the source database for this case."
    });
  }

  const groq = new Groq({ apiKey });

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are LexAI, a professional legal research assistant. Summarize judicial decisions accurately. Never invent holdings or facts. If meaningful text exists, produce a detailed legal summary."
      },
      {
        role: "user",
        content: `Summarize this legal case professionally.

Case title: ${title}
Citation: ${citation}
Court: ${court}
Date: ${date}
Topic: ${topic}

Case text:
${fullText}

Format:
1. Facts
2. Legal issue
3. Holding / reasoning
4. Importance`
      }
    ],
    temperature: 0.2,
    max_tokens: 1200
  });

  return NextResponse.json({
    summary:
      completion.choices?.[0]?.message?.content ||
      "No summary generated."
  });
}
