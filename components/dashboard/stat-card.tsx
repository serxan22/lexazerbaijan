import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n-config";
import { formatNumber } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  locale = "en"
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  locale?: Locale;
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{formatNumber(value, locale)}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-blue-800">
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
