export function VerifiedBadge({ className = "" }: { className?: string }) {
  return (
    <span
      title="Verified Writer"
      className={`inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold leading-none text-white shadow-sm ${className}`}
    >
      ✓
    </span>
  );
}
