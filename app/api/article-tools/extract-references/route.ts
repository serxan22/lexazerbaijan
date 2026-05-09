import { NextResponse } from "next/server";
import Groq from "groq-sdk";

import { getArticleBySlug } from "@/lib/data";
import { sanitizeArticleContent } from "@/lib/sanitize";

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = String(body.slug || "");

    if (!slug) {
      return NextResponse.json({ error: "Article slug is required." }, { status: 400 });
    }

    const article = await getArticleBySlug(slug, { incrementViews: false });

    if (!article) {
      return NextResponse.json({ error: "Article not found." }, { status: 404 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "GROQ_API_KEY is missing." }, { status: 500 });
    }

    const cleanContent = stripHtml(sanitizeArticleContent(article.content)).slice(0, 12000);

    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You extract legal references from articles. Return ONLY valid JSON. Do not add markdown. Do not invent references."
        },
        {
          role: "user",
          content: `Extract legal references from this article.

Return only this JSON shape:
{
  "cases": ["case names only"],
  "laws": ["laws, codes, constitutional provisions, treaty articles"],
  "conventions": ["conventions, treaties, charters"]
}

Rules:
- Include only references clearly mentioned or strongly identifiable in the text.
- Do not invent cases, laws, or treaties.
- Keep names concise.
- Maximum 8 items per category.

Title: ${article.title}

Article:
${cleanContent}`
        }
      ],
      temperature: 0.1,
      max_tokens: 700
    });

    const raw = completion.choices?.[0]?.message?.content ?? "{}";

    let parsed = { cases: [], laws: [], conventions: [] };

    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { cases: [], laws: [], conventions: [] };
    }

    return NextResponse.json({
      references: {
        cases: Array.isArray(parsed.cases) ? parsed.cases.slice(0, 8) : [],
        laws: Array.isArray(parsed.laws) ? parsed.laws.slice(0, 8) : [],
        conventions: Array.isArray(parsed.conventions) ? parsed.conventions.slice(0, 8) : []
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Reference extraction failed." }, { status: 500 });
  }
}
