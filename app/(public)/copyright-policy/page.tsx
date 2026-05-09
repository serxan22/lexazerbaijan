import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Copyright Policy",
  description: "LexAzerbaijan copyright policy."
};

export default function CopyrightPolicyPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b bg-white py-10">
        <div className="legal-container">
          <p className="eyebrow">Legal Policy</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-slate-950">
            Copyright Policy
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            LexAzerbaijan respects intellectual property rights and expects authors and users to do the same.
          </p>
        </div>
      </section>

      <article className="legal-container prose prose-slate max-w-4xl py-10">
        <h2>1. Ownership of Content</h2>
        <p>
          Unless otherwise stated, authors retain copyright ownership of articles, essays,
          analyses, case comments, opinion pieces, and other original materials submitted
          to and published by LexAzerbaijan.
        </p>
        <p>
          By submitting content, the author grants LexAzerbaijan a non-exclusive,
          worldwide, royalty-free license to publish, display, archive, distribute,
          promote, format, edit, and adapt the work for publication purposes.
        </p>

        <h2>2. Author Responsibilities</h2>
        <p>
          Authors confirm that their submissions are original or properly licensed,
          do not infringe third-party rights, include proper citations, and do not contain
          unlawful, defamatory, fraudulent, or misleading material.
        </p>

        <h2>3. Prohibited Conduct</h2>
        <p>
          Plagiarism, unauthorized reproduction, mass-copying, falsified citations,
          fabricated authorities, and deceptively generated content are prohibited.
        </p>

        <h2>4. Educational and Research Use</h2>
        <p>
          LexAzerbaijan publishes materials for educational, academic, informational,
          and research purposes. Case summaries, commentary, criticism, and legal analysis
          may reference public legal materials where permitted by applicable law.
        </p>

        <h2>5. Copyright Complaints</h2>
        <p>
          If you believe that material published on LexAzerbaijan infringes your rights,
          contact us at editorial@lexazerbaijan.az with proof of ownership, the article URL,
          and an explanation of the alleged infringement.
        </p>

        <h2>6. Editorial Rights</h2>
        <p>
          LexAzerbaijan may reject, edit, suspend, or remove content that violates legal,
          editorial, academic, or ethical standards.
        </p>
      </article>
    </div>
  );
}
