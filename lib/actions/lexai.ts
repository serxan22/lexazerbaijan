"use server";

import OpenAI from "openai";

import type { ActionState } from "@/lib/form-state";
import { formString } from "@/lib/form-data";

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) return null;

  return new OpenAI({ apiKey });
}

export async function askLexAiAction(_previous: ActionState, formData: FormData): Promise<ActionState> {
  const question = formString(formData, "question").trim();

  if (question.length < 5) {
    return {
      status: "error",
      message: "Please write a clear legal question."
    };
  }

  const openai = getOpenAI();

  if (!openai) {
    return {
      status: "error",
      message: "LexAI is not configured yet. Please add OPENAI_API_KEY in Vercel Environment Variables."
    };
  }

  try {
    const response = await openai.responses.create({
      model: "gpt-5.4-mini",
      input: [
        {
          role: "system",
          content:
            "You are LexAI, a careful legal research assistant for LexAzerbaijan. Your answers are educational and research-focused, not legal advice. Be structured, clear, and honest about uncertainty. Do not invent laws, case names, or article numbers."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    return {
      status: "success",
      message: response.output_text || "No answer generated."
    };
  } catch (error) {
    console.error("LexAI error:", error);

    return {
      status: "error",
      message:
        "LexAI could not answer right now. Please check the OpenAI API key, billing status, and model access in your OpenAI account."
    };
  }
}
