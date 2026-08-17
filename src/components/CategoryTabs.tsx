import Link from "next/link";
import { CATEGORIES } from "@/lib/types";

export function CategoryTabs({ active }: { active?: string }) {
  const tabs: string[] = ["全体", ...CATEGORIES];

  return (
    <nav className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = (tab === "全体" && !active) || tab === active;
        const href = tab === "全体" ? "/" : `/?category=${encodeURIComponent(tab)}`;
        return (
          <Link
            key={tab}
            href={href}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-brand text-white"
                : "border border-border bg-white text-ink-soft hover:border-border-muted"
            }`}
          >
            {tab}
          </Link>
        );
      })}
    </nav>
  );
}
