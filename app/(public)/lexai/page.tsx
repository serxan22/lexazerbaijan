import type { Metadata } from "next";

import { LexAiForm } from "@/components/lexai/lexai-form";

export const metadata: Metadata = {
  title: "Ask LexAI",
  description: "AI legal research assistant for LexAzerbaijan."
};

export default function LexAiPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-10">
        <div className="legal-container">
          <p className="eyebrow">AI Assistant</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">
            Ask LexAI
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Ask legal research questions, structure arguments, simplify doctrines, or prepare study notes.
          </p>
        </div>
      </section>

      <section className="legal-container py-8">
        <LexAiForm />
      </section>
    </div>
  );
}
