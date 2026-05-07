export const siteConfig = {
  name: "LexAzerbaijan",
  shortName: "LexAzerbaijan",
  description:
    "A modern legal knowledge hub for Azerbaijan's students, researchers, lawyers, and academics.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og.png",
  links: {
    submit: "/submit",
    articles: "/articles",
    categories: "/categories",
    contact: "/contact",
    editorialPolicy: "/editorial-policy"
  },
  nav: [
    { title: "Articles", href: "/articles" },
    { title: "Categories", href: "/categories" },
    { title: "Authors", href: "/authors" },
    { title: "About", href: "/about" }
  ],
  legalLinks: [
    { title: "Editorial Policy", href: "/editorial-policy" },
    { title: "Contact", href: "/contact" },
    { title: "Disclaimer", href: "/editorial-policy#disclaimer" }
  ],
  categories: [
    "Constitutional Law",
    "Criminal Law",
    "Administrative Law",
    "Corporate Law",
    "Civil Law",
    "International Law",
    "EU Law",
    "Human Rights",
    "Labor Law",
    "Tax Law",
    "Legal Theory",
    "Court Decisions",
    "Legal Reform",
    "Student Research"
  ]
} as const;

export type SiteConfig = typeof siteConfig;
