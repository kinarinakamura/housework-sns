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
              className={`flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition-colors ${
                active
                  ? "border-brand bg-brand-light/30 text-brand-dark"
                  : "border-border bg-white text-ink-soft hover:border-border-muted"
              }`}
            >
              <span>{emoji}</span>
              {count > 0 && <span className="text-xs tabular-nums">{count}</span>}
            </button>
          </form>
        );
      })}
    </div>
  );
}
