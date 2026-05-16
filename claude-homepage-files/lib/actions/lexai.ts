"use server";

import Groq from "groq-sdk";

import type { ActionState } from "@/lib/form-state";
import { formString } from "@/lib/form-data";

function getGroq() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) return null;

  return new Groq({
    apiKey
  });
}

export async function askLexAiAction(
  _previous: ActionState,
  formData: FormData
): Promise<ActionState> {
  const question = formString(formData, "question").trim();

  if (question.length < 5) {
    return {
      status: "error",
      message: "Please write a clear legal question."
    };
  }

  const groq = getGroq();

  if (!groq) {
    return {
      status: "error",
      message: "Groq API key missing."
    };
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are LexAI, an educational legal research assistant for LexAzerbaijan. Give structured, accurate, educational answers for law students and researchers. Do not invent laws or cases."
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.4,
      max_tokens: 1400
    });

    return {
      status: "success",
      message:
        completion.choices?.[0]?.message?.content ??
        "No response generated."
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message:
        "LexAI could not answer right now. Check your Groq API configuration."
    };
  }
}
