import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      mode,
      content,
      title
    } = body;

    if (!content || !mode) {
      return NextResponse.json(
        { error: "Missing content or mode." },
        { status: 400 }
      );
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const prompts: Record<string, string> = {
      summarize:
        "Summarize this legal article professionally for law students.",
      simple:
        "Explain this legal article in simple English for beginner law students.",
      irac:
        "Convert this legal article into an IRAC-style legal analysis.",
      counter:
        "Generate strong legal counterarguments and opposing perspectives against the arguments in this article."
    };

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are LexAI, a professional legal research assistant."
        },
        {
          role: "user",
          content: `
Article title:
${title}

Task:
${prompts[mode]}

Article content:
${content}
`
        }
      ],
      temperature: 0.3,
      max_tokens: 1400
    });

    return NextResponse.json({
      result:
        completion.choices?.[0]?.message?.content ??
        "No response generated."
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "AI processing failed." },
      { status: 500 }
    );
  }
}
