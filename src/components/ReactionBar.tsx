import { toggleReaction } from "@/app/actions";
import { REACTIONS } from "@/lib/types";

export function ReactionBar({
  postId,
  counts,
  myEmojis,
}: {
  postId: string;
  counts: Record<string, number>;
  myEmojis: Set<string>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {REACTIONS.map(({ emoji, label }) => {
        const count = counts[emoji] ?? 0;
        const active = myEmojis.has(emoji);
        return (
          <form key={emoji} action={toggleReaction.bind(null, postId, emoji)}>
            <button
              type="submit"
              title={label}
              aria-pressed={active}
              className={`flex items-center gap-1.5 rounded-full border px-[13px] py-1.5 text-[15px] transition-colors ${
                active
                  ? "border-border-muted bg-bg-muted"
                  : "border-border bg-white hover:border-border-muted"
              }`}
            >
              <span>{emoji}</span>
              {count > 0 && (
                <span
                  className={`text-xs font-bold tabular-nums ${
                    active ? "text-brand-dark" : "text-ink-soft"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          </form>
        );
      })}
    </div>
  );
}
