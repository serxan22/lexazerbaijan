import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";

import "@/app/globals.css";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  verification: {
    google: "xepOVrbFn0xgib-lMvAR61HFrmAH_weyvIGithHKzPY"
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className="min-h-screen font-sans">
        <ThemeProvider>
          <RouteLoadingIndicator />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
