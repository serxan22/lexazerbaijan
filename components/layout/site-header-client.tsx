"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, ChevronDown, LayoutDashboard, LogIn, LogOut, Menu, PenSquare, ShieldCheck, UserRound } from "lucide-react";

import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/layout/logo";
import { NotificationBell } from "@/components/layout/notification-bell";
import { HeaderSearch } from "@/components/layout/header-search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { initials } from "@/lib/utils";
import type { UserRole } from "@/types/database";

type HeaderProfile = {
  id: string;
  fullName: string | null;
  username: string | null;
  avatarUrl: string | null;
  role: UserRole;
};

export function HeaderClient({
  profile,
  locale,
  dictionary,
  notifications
}: {
  profile: HeaderProfile | null;
  locale: Locale;
  dictionary: Dictionary;
  notifications?: {
    id: string;
    type: string;
    title: string;
    body: string | null;
    href: string | null;
    readAt: string | null;
    createdAt: string;
  }[];
}) {
  const isAdmin = profile?.role === "admin";
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!profileMenuOpen) return;

    const closeMenu = () => setProfileMenuOpen(false);

    window.addEventListener("scroll", closeMenu, true);

    return () => {
      window.removeEventListener("scroll", closeMenu, true);
    };
  }, [profileMenuOpen]);
  const navItems = [
    { title: dictionary.nav.articles, href: "/articles" },
    { title: dictionary.nav.discussions, href: "/discussions" },
    { title: dictionary.nav.authors, href: "/authors" },
    { title: dictionary.nav.askLexAI, href: "/lexai" },
    { title: dictionary.nav.about, href: "/about" }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#d9c79f]/70 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/82 dark:border-[#b8894a]/20 dark:bg-[#020611]/86">
      <div className="legal-container flex h-20 items-center justify-between gap-6">
        <Logo tagline={dictionary.site.journal} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label={dictionary.nav.navigation}>
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href}>{item.title}</Link>
            </Button>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Cases
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-72">
              <DropdownMenuItem asChild>
                <Link href="/cases" className="flex flex-col items-start gap-1 py-3">
                  <span className="font-semibold text-slate-900 dark:text-white">{dictionary.nav.usCases}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Search American federal and state case-law.
                  </span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/echr-cases" className="flex flex-col items-start gap-1 py-3">
                  <span className="font-semibold text-slate-900 dark:text-white">{dictionary.nav.echrCases}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Explore European Court of Human Rights judgments.
                  </span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/eu-cases" className="flex flex-col items-start gap-1 py-3">
                  <span className="font-semibold text-slate-900 dark:text-white">{dictionary.nav.euCases}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Search CJEU and General Court case-law.
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <HeaderSearch
            placeholder={dictionary.common.headerSearchPlaceholder}
            noResults={dictionary.common.headerSearchNoResults}
          />
          <Button variant="gold" asChild>
            <Link href="/submit">
              <PenSquare className="h-4 w-4" />
              {dictionary.nav.submitArticle}
            </Link>
          </Button>
          <LanguageSwitcher locale={locale} label={dictionary.nav.language} />
          {profile ? (
            <>
              <NotificationBell userId={profile.id} initialNotifications={notifications ?? []} />
            </>
          ) : null}

          {profile ? (
            <div
              onMouseLeave={() => setProfileMenuOpen(false)}
            >
              <DropdownMenu modal={false} open={profileMenuOpen} onOpenChange={setProfileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={profile.avatarUrl ?? undefined} alt={profile.fullName ?? dictionary.nav.publicProfile} />
                    <AvatarFallback>{initials(profile.fullName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <span className="block">{profile.fullName ?? dictionary.site.fallbackMember}</span>
                  <span className="text-xs font-normal text-slate-500">@{profile.username ?? "profile"}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    {dictionary.nav.dashboard}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/authors/${profile.username ?? ""}`}>
                    <UserRound className="mr-2 h-4 w-4" />
                    {dictionary.nav.publicProfile}
                  </Link>
                </DropdownMenuItem>
                {isAdmin ? (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      {dictionary.nav.admin}
                    </Link>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuSeparator />
                <div className="flex items-center justify-between px-2 py-2">
                  <span className="text-sm text-slate-600 dark:text-slate-200">Appearance</span>
                  <ThemeToggle />
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={(event) => {
                    event.preventDefault();
                    const form = document.createElement("form");
                    form.method = "post";
                    form.action = "/auth/logout";
                    document.body.appendChild(form);
                    form.submit();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {dictionary.nav.signOut}
                </DropdownMenuItem>
              </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/login">
                <LogIn className="h-4 w-4" />
                {dictionary.nav.login}
              </Link>
            </Button>
          )}
        </div>

        <Dialog open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label={dictionary.nav.navigation}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="top-6 max-h-[90vh] overflow-y-auto translate-y-0 sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-slate-950 dark:text-white">{dictionary.nav.navigation}</DialogTitle>
              <DialogDescription className="text-slate-600 dark:text-slate-300">{dictionary.site.description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-2">
              {[...navItems, { title: dictionary.nav.submitArticle, href: "/submit" }].map((item) => (
                <Button key={item.href} variant="ghost" asChild className="justify-start">
                  <Link href={item.href} onClick={() => setMobileNavOpen(false)}>{item.title}</Link>
                </Button>
              ))}
              <div className="premium-panel p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  {dictionary.nav.cases}
                </p>
                <div className="grid gap-2">
                  <Button variant="ghost" asChild className="justify-start">
                    <Link href="/cases" onClick={() => setMobileNavOpen(false)}>{dictionary.nav.usCases}</Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link href="/echr-cases" onClick={() => setMobileNavOpen(false)}>{dictionary.nav.echrCases}</Link>
                  </Button>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link href="/eu-cases" onClick={() => setMobileNavOpen(false)}>{dictionary.nav.euCases}</Link>
                  </Button>
                </div>
              </div>

              <div className="my-2 border-t" />
              <Button variant="outline" asChild className="justify-start">
                <Link href="/articles" onClick={() => setMobileNavOpen(false)}>
                  <BookOpen className="h-4 w-4" />
                  {dictionary.nav.exploreArticles}
                </Link>
              </Button>
              <LanguageSwitcher locale={locale} label={dictionary.nav.language} />

              <div className="flex items-center justify-between rounded-lg border border-[#d9c79f]/70 px-4 py-3 text-sm text-slate-700 dark:border-[#b8894a]/20 dark:text-slate-200">
                <span>Appearance</span>
                <ThemeToggle />
              </div>
              {profile ? (
                <>
                  <Button variant="outline" asChild className="justify-start">
                    <Link href="/dashboard" onClick={() => setMobileNavOpen(false)}>
                      <LayoutDashboard className="h-4 w-4" />
                      {dictionary.nav.dashboard}
                    </Link>
                  </Button>
                  <form action="/auth/logout" method="post">
                    <Button variant="ghost" className="w-full justify-start">
                      <LogOut className="h-4 w-4" />
                      {dictionary.nav.signOut}
                    </Button>
                  </form>
                </>
              ) : (
                <Button variant="gold" asChild className="justify-start">
                  <Link href="/login" onClick={() => setMobileNavOpen(false)}>
                    <LogIn className="h-4 w-4" />
                    {dictionary.nav.login}
                  </Link>
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
