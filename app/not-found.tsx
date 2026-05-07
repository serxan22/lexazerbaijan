import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getDictionary, getLocale } from "@/lib/i18n";

export default async function NotFound() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <div className="legal-container flex min-h-[70vh] items-center justify-center py-20">
      <div className="max-w-xl text-center">
        <FileQuestion className="mx-auto h-10 w-10 text-gold" />
        <h1 className="mt-6 font-serif text-4xl font-semibold text-slate-950">{dictionary.empty.pageTitle}</h1>
        <p className="mt-4 text-slate-600">
          {dictionary.empty.pageBody}
        </p>
        <Button asChild className="mt-8">
          <Link href="/articles">{dictionary.nav.exploreArticles}</Link>
        </Button>
      </div>
    </div>
  );
}
