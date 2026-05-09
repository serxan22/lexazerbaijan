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
          "You are LexAI, a professional legal research assistant for law students and researchers. Never invent facts, legal issues, holdings, or procedural history. If the available case text is limited, do NOT speculate or mention missing metadata. Instead, provide a concise professional overview using only the available title, citation, court, and snippet. Avoid phrases like 'metadata is limited', 'cannot determine', or similar disclaimers."
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

1. Overview
2. Main legal issue
3. Key reasoning or outcome
4. Why the case matters

Rules:
- Be concise and professional.
- Never speculate.
- If details are unavailable, focus only on verified available information.
- Do not mention lack of metadata or unavailable information.
- Do not write filler text.`
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
