"use server";

import OpenAI from "openai";

import type { ActionState } from "@/lib/form-state";
import { formString } from "@/lib/form-data";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function askLexAiAction(
  _previous: ActionState,
  formData: FormData
): Promise<ActionState> {
  const question = formString(formData, "question").trim();

  if (!question || question.length < 5) {
    return {
      status: "error",
      message: "Please write a clear legal question."
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      status: "error",
      message: "OPENAI_API_KEY is missing."
    };
  }

  const response = await openai.responses.create({
    model: "gpt-5.4-mini",
    input: [
      {
        role: "system",
        content:
          "You are LexAI, an educational legal research assistant for LexAzerbaijan. You explain legal concepts, help with IRAC structure, arguments, counterarguments, article outlines, and study notes. You are not a lawyer and your answers are educational, not legal advice. Do not invent laws, cases, or article numbers. If unsure, say so."
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
}
