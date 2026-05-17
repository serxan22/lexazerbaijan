import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";

import "@/app/globals.css";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PremiumAnimations } from "@/components/animations/premium-animations";
import { LenisSmoothScroll } from "@/components/interactive/lenis-smooth-scroll";
import { PremiumCursor } from "@/components/interactive/premium-cursor";
import { PremiumScrollRevealRuntime } from "@/components/interactive/premium-scroll-reveal-runtime";
import { RouteLoadingIndicator } from "@/components/layout/route-loading-indicator";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website"
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "xepOVrbFn0xgib-lMvAR61HFrmAH_weyvIGithHKzPY"
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <ThemeProvider>
          <RouteLoadingIndicator />
          <PremiumAnimations />
          <LenisSmoothScroll />
          <PremiumScrollRevealRuntime />
          <PremiumCursor />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
