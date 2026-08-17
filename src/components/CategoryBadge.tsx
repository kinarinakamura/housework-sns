const CATEGORY_STYLES: Record<string, string> = {
  掃除: "bg-info/10 text-info",
  洗濯: "bg-brand-light/40 text-brand-dark",
  料理: "bg-error-bg text-error",
  片付け: "bg-bg-alt text-ink-soft",
  その他: "bg-bg-muted text-ink-soft",
};

export function CategoryBadge({ category }: { category: string }) {
  const style = CATEGORY_STYLES[category] ?? CATEGORY_STYLES["その他"];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}
    >
      {category}
    </span>
  );
}
