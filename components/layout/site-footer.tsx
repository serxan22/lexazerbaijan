import Link from "next/link";
import { Mail, MapPin, Scale } from "lucide-react";

import { siteConfig } from "@/config/site";
import { getDictionary, getLocale } from "@/lib/i18n";
import { Logo } from "@/components/layout/logo";

export async function SiteFooter() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const navItems = [
    { title: dictionary.nav.articles, href: "/articles" },
    { title: dictionary.nav.discussions, href: "/discussions" },
    { title: dictionary.nav.cases, href: "/cases" },
    { title: dictionary.nav.authors, href: "/authors" },
    { title: dictionary.nav.askLexAI, href: "/lexai" },
    { title: dictionary.nav.about, href: "/about" }
  ];
  const legalLinks = [
    { title: dictionary.footer.editorialPolicy, href: "/editorial-policy" },
    { title: dictionary.pages.copyrightPolicy, href: "/copyright-policy" },
    { title: dictionary.pages.aiContentPolicy, href: "/ai-content-policy" },
    { title: dictionary.pages.authorAgreement, href: "/author-agreement" },
    { title: dictionary.footer.contact, href: "/contact" },
    { title: dictionary.footer.disclaimer, href: "/editorial-policy#disclaimer" }
  ];

  return (
    <footer className="border-t border-border/80 bg-[#050917] text-white">
      <div className="legal-container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo tagline={dictionary.site.journal} inverted />
          <p className="max-w-md text-sm leading-6 text-white/62">
            {dictionary.footer.body}
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-white/62">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" />
              {dictionary.site.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" />
              editorial@lexazerbaijan.az
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/38">{dictionary.footer.platform}</h3>
          <div className="mt-4 grid gap-3 text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-white/62 transition hover:text-white">
                {item.title}
              </Link>
            ))}
            <Link href="/submit" className="text-white/62 transition hover:text-white">
              {dictionary.nav.submitArticle}
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/38">{dictionary.footer.legal}</h3>
          <div className="mt-4 grid gap-3 text-sm">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-white/62 transition hover:text-white">
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <Scale className="h-5 w-5 text-gold" />
          <p className="mt-3 text-sm leading-6 text-white/62">
            {dictionary.footer.disclaimerBody}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 bg-white/[0.025] py-5">
        <div className="legal-container flex flex-col justify-between gap-2 text-xs text-white/42 md:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. {dictionary.footer.rights}</p>
          <p>{dictionary.footer.reviewed}</p>
        </div>
      </div>
    </footer>
  );
}
