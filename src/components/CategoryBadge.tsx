export function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-bg-muted px-2.5 py-0.5 text-xs font-medium text-ink-soft">
      {category}
    </span>
  );
}
