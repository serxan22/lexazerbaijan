import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const supabase = await createServerSupabaseClient();

  await supabase.rpc("increment_article_views", {
    article_slug: params.slug
  });

  return NextResponse.json({ success: true });
}
