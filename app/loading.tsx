import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="legal-container flex min-h-[60vh] items-center justify-center">
      <div className="inline-flex items-center gap-3 rounded-md border bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
        <Loader2 className="h-4 w-4 animate-spin text-gold" />
      </div>
    </div>
  );
}
