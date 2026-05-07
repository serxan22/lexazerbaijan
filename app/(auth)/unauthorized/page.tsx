import Link from "next/link";
import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return { title: dictionary.empty.unauthorizedTitle };
}

export default async function UnauthorizedPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <div className="legal-container flex min-h-[70vh] items-center justify-center py-20">
      <div className="max-w-lg text-center">
        <ShieldAlert className="mx-auto h-10 w-10 text-gold" />
        <h1 className="mt-6 font-serif text-4xl font-semibold text-slate-950">{dictionary.empty.unauthorizedTitle}</h1>
        <p className="mt-4 text-slate-600">{dictionary.empty.unauthorizedBody}</p>
        <Button asChild className="mt-8">
          <Link href="/dashboard">{dictionary.empty.backDashboard}</Link>
        </Button>
      </div>
    </div>
  );
}
