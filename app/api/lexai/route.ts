import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  const { message } = await request.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content:
          "You are LexAI, a legal education assistant for LexAzerbaijan. Give clear, careful, educational legal explanations. Do not present answers as formal legal advice. Encourage users to consult qualified lawyers for real cases."
      },
      {
        role: "user",
        content: message
      }
    ]
  });

  return NextResponse.json({
    answer: response.output_text
  });
}
