import Link from "next/link";
import { CATEGORIES } from "@/lib/types";

export function CategoryTabs({ active }: { active?: string }) {
  const tabs: string[] = ["全体", ...CATEGORIES];

  return (
    <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((tab) => {
        const isActive = (tab === "全体" && !active) || tab === active;
        const href = tab === "全体" ? "/" : `/?category=${encodeURIComponent(tab)}`;
        return (
          <Link
            key={tab}
            href={href}
            className={`flex-none rounded-full px-[18px] py-2 text-sm font-bold whitespace-nowrap no-underline transition-colors hover:no-underline ${
              isActive
                ? "border border-brand bg-brand/10 text-brand-dark"
                : "border border-[#e7ddd0] bg-white text-ink-soft hover:border-border-muted"
            }`}
          >
            {tab}
          </Link>
        );
      })}
    </nav>
  );
}
