import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Content Policy",
  description: "LexAzerbaijan AI content policy."
};

export default function AiContentPolicyPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-10">
        <div className="legal-container">
          <p className="eyebrow">Legal Policy</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">
            AI Content Policy
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Rules for responsible AI-assisted writing and LexAI use.
          </p>
        </div>
      </section>

      <article className="legal-container prose prose-slate max-w-4xl py-10">
        <h2>1. Purpose</h2>
        <p>
          LexAzerbaijan permits limited and responsible use of AI tools for brainstorming,
          language improvement, structure, summarization, grammar correction, and research assistance.
        </p>

        <h2>2. Human Responsibility</h2>
        <p>
          All submitted content must undergo meaningful human review. Authors remain responsible
          for factual accuracy, legal accuracy, citations, originality, and compliance with
          ethical and academic standards.
        </p>

        <h2>3. Prohibited AI Use</h2>
        <p>
          Publishing AI-generated content without human review, fabricating legal authorities,
          impersonation, misleading legal advice, and unlawful reproduction of copyrighted works
          are prohibited.
        </p>

        <h2>4. LexAI Disclaimer</h2>
        <p>
          LexAI is an educational legal research assistant. It does not provide legal advice
          and may produce inaccurate or incomplete responses. Users should independently verify
          all legal information.
        </p>
      </article>
    </div>
  );
}
