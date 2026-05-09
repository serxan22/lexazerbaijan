import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Author Agreement",
  description: "LexAzerbaijan author submission agreement."
};

export default function AuthorAgreementPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-10">
        <div className="legal-container">
          <p className="eyebrow">Contributor Terms</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">
            Author Agreement
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Terms that apply when contributors submit content to LexAzerbaijan.
          </p>
        </div>
      </section>

      <article className="legal-container prose prose-slate max-w-4xl py-10">
        <p>By submitting content to LexAzerbaijan, contributors agree that:</p>

        <ol>
          <li>The submitted work is original or properly licensed.</li>
          <li>The author grants LexAzerbaijan a non-exclusive license to publish, archive, distribute, and promote the work.</li>
          <li>The author is responsible for the accuracy and legality of the submission.</li>
          <li>Citations, quotations, and referenced materials are properly attributed.</li>
          <li>LexAzerbaijan has editorial discretion regarding publication, editing, revision requests, or removal.</li>
          <li>LexAzerbaijan may remove content that violates platform policies, academic standards, or applicable law.</li>
          <li>AI-assisted writing remains subject to human responsibility and verification.</li>
        </ol>
      </article>
    </div>
  );
}
