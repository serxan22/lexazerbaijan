"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const euCases = [
  {
    title: "Van Gend en Loos v Nederlandse Administratie der Belastingen",
    citation: "Case 26/62",
    year: "1963",
    topic: "Direct effect",
    court: "Court of Justice",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:61962CJ0026"
  },
  {
    title: "Costa v ENEL",
    citation: "Case 6/64",
    year: "1964",
    topic: "Supremacy of EU law",
    court: "Court of Justice",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:61964CJ0006"
  },
  {
    title: "Internationale Handelsgesellschaft",
    citation: "Case 11/70",
    year: "1970",
    topic: "Fundamental rights and supremacy",
    court: "Court of Justice",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:61970CJ0011"
  },
  {
    title: "Simmenthal",
    citation: "Case 106/77",
    year: "1978",
    topic: "National courts and supremacy",
    court: "Court of Justice",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:61977CJ0106"
  },
  {
    title: "Cassis de Dijon",
    citation: "Case 120/78",
    year: "1979",
    topic: "Free movement of goods",
    court: "Court of Justice",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:61978CJ0120"
  },
  {
    title: "Francovich",
    citation: "Joined Cases C-6/90 and C-9/90",
    year: "1991",
    topic: "State liability",
    court: "Court of Justice",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:61990CJ0006"
  },
  {
    title: "Factortame",
    citation: "Case C-213/89",
    year: "1990",
    topic: "Interim relief and supremacy",
    court: "Court of Justice",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:61989CJ0213"
  },
  {
    title: "Commission v Italy",
    citation: "Case C-110/05",
    year: "2009",
    topic: "Free movement of goods / trailers",
    court: "Court of Justice",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62005CJ0110"
  },
  {
    title: "Google Spain",
    citation: "Case C-131/12",
    year: "2014",
    topic: "Data protection / right to be forgotten",
    court: "Court of Justice",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62012CJ0131"
  },
  {
    title: "Digital Rights Ireland",
    citation: "Joined Cases C-293/12 and C-594/12",
    year: "2014",
    topic: "Privacy and data retention",
    court: "Court of Justice",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62012CJ0293"
  }
];

export function EuCasesSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return euCases;

    return euCases.filter((item) =>
      [
        item.title,
        item.citation,
        item.year,
        item.topic,
        item.court
      ]
        .join(" ")
        .toLowerCase()
        .includes(value)
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search EU cases, e.g. Costa, supremacy, Commission v Italy..."
            className="h-12"
          />

          <Button type="button" variant="gold" className="h-12 md:w-40">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {results.map((item) => (
          <article key={item.citation} className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                  {item.topic}
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold text-slate-950">
                  {item.title}
                </h2>

                <div className="mt-2 space-y-1 text-sm text-slate-500">
                  <p>{item.citation}</p>
                  <p>{item.court} · {item.year}</p>
                </div>
              </div>

              <Button variant="outline" asChild>
                <Link href={item.url} target="_blank" rel="noreferrer">
                  Official source
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </article>
        ))}

        {results.length === 0 ? (
          <div className="rounded-2xl border bg-white p-6 text-center text-sm text-slate-500">
            No EU cases found in the current selected database.
          </div>
        ) : null}
      </div>
    </div>
  );
}
