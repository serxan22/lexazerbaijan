import Link from "next/link";
import { BookOpen, Eye, Heart } from "lucide-react";

import type { AuthorSummary } from "@/lib/content-types";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";
import { formatNumber, initials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function AuthorCard({
  author,
  dictionary,
  locale
}: {
  author: AuthorSummary;
  dictionary: Dictionary;
  locale: Locale;
}) {
  return (
    <Card className="h-full border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-soft">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={author.avatarUrl ?? undefined} alt={author.fullName} />
            <AvatarFallback>{initials(author.fullName)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <Link href={`/authors/${author.username}`} className="font-serif text-xl font-semibold text-slate-950">
              {author.fullName}
            </Link>
            <p className="mt-1 truncate text-sm text-slate-500">{author.workplace ?? author.university ?? dictionary.site.independentResearcher}</p>
          </div>
        </div>
        {author.bio ? <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{author.bio}</p> : null}
        <div className="mt-5 flex flex-wrap gap-2">
          {author.interests.slice(0, 3).map((interest) => (
            <Badge key={interest} variant="blue">
              {interest}
            </Badge>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2 border-t pt-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {formatNumber(author.publishedCount, locale)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {formatNumber(author.totalViews, locale)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" />
            {formatNumber(author.totalLikes, locale)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
