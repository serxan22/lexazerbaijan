import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message: "LexAI uses the server action endpoint."
  });
}
