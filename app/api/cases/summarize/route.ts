import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(request: Request) {
  const body = await request.json();

  const title = String(body.title || "");
  const court = String(body.court || "");
  const date = String(body.date || "");
  const citation = String(body.citation || "");
  const topic = String(body.topic || "");
  const text = String(body.text || "");

  if (!title || title.length < 2) {
    return NextResponse.json(
      { error: "Case title is required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GROQ_API_KEY is missing." },
      { status: 500 }
    );
  }

  const groq = new Groq({ apiKey });

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are LexAI, a legal research assistant. Summarize case-law for law students. Do not invent facts. If the provided text is limited, say that the summary is based only on available metadata/snippet."
      },
      {
        role: "user",
        content: `Summarize this case in a clear structured way.

Case title: ${title}
Citation: ${citation}
Court: ${court}
Date: ${date}
Topic: ${topic}

Available case text / snippet:
${text}

Use this format:
1. Short overview
2. Legal issue
3. Court reasoning / holding
4. Importance for legal research`
      }
    ],
    temperature: 0.3,
    max_tokens: 900
  });

  return NextResponse.json({
    summary:
      completion.choices?.[0]?.message?.content ||
      "No summary generated."
  });
}
