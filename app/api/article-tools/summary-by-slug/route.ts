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
      return NextResponse.json(
        { error: "Article slug is required." },
        { status: 400 }
      );
    }

    const article = await getArticleBySlug(slug, { incrementViews: false });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found." },
        { status: 404 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is missing." },
        { status: 500 }
      );
    }

    const cleanContent = stripHtml(sanitizeArticleContent(article.content)).slice(0, 12000);

    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are LexAI, a professional legal research assistant. Summarize legal articles accurately and clearly for law students. Do not invent facts."
        },
        {
          role: "user",
          content: `Summarize this legal article.

Title: ${article.title}
Abstract: ${article.abstract}

Article content:
${cleanContent}

Use this format:
1. Main idea
2. Key legal points
3. Practical importance
4. Short takeaway`
        }
      ],
      temperature: 0.3,
      max_tokens: 900
    });

    return NextResponse.json({
      summary:
        completion.choices?.[0]?.message?.content ??
        "No summary generated."
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Article summary failed." },
      { status: 500 }
    );
  }
}
