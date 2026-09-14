import { CategoryBadge } from "@/components/CategoryBadge";
import { ReactionBar } from "@/components/ReactionBar";
import { CommentForm } from "@/components/CommentForm";
import { formatRelativeTime } from "@/lib/format";
import type { PostWithRelations } from "@/lib/types";

export function PostCard({
  post,
  currentUserId,
}: {
  post: PostWithRelations;
  currentUserId: string;
}) {
  const counts: Record<string, number> = {};
  const myEmojis = new Set<string>();
  for (const r of post.reactions) {
    counts[r.emoji] = (counts[r.emoji] ?? 0) + 1;
    if (r.user_id === currentUserId) myEmojis.add(r.emoji);
  }

  const nickname = post.profiles?.nickname ?? "ゲスト";
  const avatar = post.profiles?.avatar_emoji ?? "🏠";

  return (
    <article className="rounded-xl border border-border bg-white p-4 shadow-sm sm:p-5">
      <header className="flex items-center gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-bg-muted text-xl">
          {avatar}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate font-bold text-ink">{nickname}</span>
            <CategoryBadge category={post.category} />
          </div>
          <time className="text-xs text-ink-faint">
            {formatRelativeTime(post.created_at)}
          </time>
        </div>
      </header>

      {post.body && (
        <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-ink">
          {post.body}
        </p>
      )}

      <div className="mt-4">
        <ReactionBar postId={post.id} counts={counts} myEmojis={myEmojis} />
      </div>

      <div className="mt-4 space-y-2 border-t border-border pt-3">
        {post.comments.length > 0 && (
          <ul className="space-y-2">
            {post.comments.map((c) => (
              <li key={c.id} className="flex gap-2 text-sm">
                <span className="flex-none">
                  {c.profiles?.avatar_emoji ?? "🏠"}
                </span>
                <span className="text-ink-soft">
                  <span className="font-medium text-ink">
                    {c.profiles?.nickname ?? "ゲスト"}
                  </span>{" "}
                  {c.body}
                </span>
              </li>
            ))}
          </ul>
        )}

        {post.comments_enabled ? (
          <CommentForm postId={post.id} />
        ) : (
          <p className="text-xs text-ink-faint">
            この投稿はコメントを受け付けていません
          </p>
        )}
      </div>
    </article>
  );
}
