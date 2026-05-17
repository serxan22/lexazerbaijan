import Link from "next/link";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export function getTableOfContents(content: string): Heading[] {
  const headings: Heading[] = [];
  const pattern = /<h([2-4])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h[2-4]>/gi;
  let match = pattern.exec(content);

  while (match) {
    headings.push({
      level: Number(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, "")
    });
    match = pattern.exec(content);
  }

  return headings;
}

export function TableOfContents({ content, label }: { content: string; label: string }) {
  const headings = getTableOfContents(content);
  if (!headings.length) return null;

  return (
    <aside className="premium-surface sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-auto p-5 lg:block">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <nav className="mt-4 grid gap-2 text-sm">
        {headings.map((heading) => (
          <Link
            key={heading.id}
            href={`#${heading.id}`}
            className={heading.level > 2 ? "pl-3 text-slate-500 hover:text-[#8a612f] dark:text-slate-400 dark:hover:text-[#f1d79d]" : "text-slate-700 hover:text-[#8a612f] dark:text-slate-300 dark:hover:text-[#f1d79d]"}
          >
            {heading.text}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
