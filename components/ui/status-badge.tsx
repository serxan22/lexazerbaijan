import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/lib/i18n";
import type { ArticleStatus } from "@/types/database";

const statusCopy: Record<ArticleStatus, { label: string; variant: "secondary" | "warning" | "success" | "destructive" }> = {
  draft: { label: "Draft", variant: "secondary" },
  pending_review: { label: "Pending review", variant: "warning" },
  approved: { label: "Approved", variant: "success" },
  rejected: { label: "Rejected", variant: "destructive" }
};

export function StatusBadge({ status, dictionary }: { status: ArticleStatus; dictionary?: Dictionary }) {
  const copy = statusCopy[status];
  return <Badge variant={copy.variant}>{dictionary?.status[status] ?? copy.label}</Badge>;
}
