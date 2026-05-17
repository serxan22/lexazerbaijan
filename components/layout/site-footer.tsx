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
    <footer className="border-t border-[#d9c79f]/70 bg-[#f8fafc] dark:border-[#b8894a]/20 dark:bg-[#020611]">
      <div className="legal-container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo tagline={dictionary.site.journal} />
          <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
            {dictionary.footer.body}
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
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
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{dictionary.footer.platform}</h3>
          <div className="mt-4 grid gap-3 text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-slate-600 transition hover:text-[#8a612f] dark:text-slate-300 dark:hover:text-[#f1d79d]">
                {item.title}
              </Link>
            ))}
            <Link href="/submit" className="text-slate-600 transition hover:text-[#8a612f] dark:text-slate-300 dark:hover:text-[#f1d79d]">
              {dictionary.nav.submitArticle}
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{dictionary.footer.legal}</h3>
          <div className="mt-4 grid gap-3 text-sm">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-slate-600 transition hover:text-[#8a612f] dark:text-slate-300 dark:hover:text-[#f1d79d]">
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="premium-surface p-5">
          <Scale className="h-5 w-5 text-gold" />
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {dictionary.footer.disclaimerBody}
          </p>
        </div>
      </div>
      <div className="border-t border-[#d9c79f]/70 bg-white py-5 dark:border-[#b8894a]/20 dark:bg-[#07111f]">
        <div className="legal-container flex flex-col justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. {dictionary.footer.rights}</p>
          <p>{dictionary.footer.reviewed}</p>
        </div>
      </div>
    </footer>
  );
}
