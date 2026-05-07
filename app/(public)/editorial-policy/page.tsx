import type { Metadata } from "next";
import { AlertTriangle, Ban, CheckCircle2, FileCheck2, ShieldAlert } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getDictionary, getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  return {
    title: dictionary.footer.editorialPolicy,
    description: dictionary.pages.policyBody
  };
}

export default async function EditorialPolicyPage() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const icons = [FileCheck2, Ban, ShieldAlert, CheckCircle2];

  return (
    <div className="bg-white">
      <section className="border-b bg-slate-50 py-14">
        <div className="legal-container max-w-4xl">
          <p className="eyebrow">{dictionary.footer.editorialPolicy}</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">{dictionary.pages.policyTitle}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {dictionary.pages.policyBody}
          </p>
        </div>
      </section>
      <section className="legal-container grid gap-5 py-12 md:grid-cols-2">
        {dictionary.pages.policyCards.map(([title, body], index) => {
          const Icon = icons[index] ?? FileCheck2;
          return (
          <Card key={title}>
            <CardContent className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-blue-800">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-serif text-2xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
            </CardContent>
          </Card>
          );
        })}
      </section>
      <section id="disclaimer" className="border-y bg-gold-muted py-12">
        <div className="legal-container max-w-4xl">
          <AlertTriangle className="h-8 w-8 text-gold" />
          <h2 className="mt-5 font-serif text-4xl font-semibold text-slate-950">{dictionary.pages.legalDisclaimer}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            {dictionary.pages.legalDisclaimerBody}
          </p>
        </div>
      </section>
    </div>
  );
}
