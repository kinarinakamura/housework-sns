import { Avatar } from "@/components/Avatar";
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
    <article className="flex flex-col gap-3.5 rounded-2xl border border-border bg-white px-6 pt-5 pb-[18px] shadow-[0_2px_10px_rgba(120,95,60,0.05)]">
      <header className="flex items-center gap-3">
        <Avatar value={avatar} className="h-[38px] w-[38px] text-2xl" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate text-[15px] font-bold text-ink">
              {nickname}
            </span>
            <CategoryBadge category={post.category} />
          </div>
          <time className="text-[13px] text-ink-soft">
            {formatRelativeTime(post.created_at)}
          </time>
        </div>
      </header>

      {post.body && (
        <p className="text-[15px] leading-[1.85] whitespace-pre-wrap text-ink">
          {post.body}
        </p>
      )}

      <ReactionBar postId={post.id} counts={counts} myEmojis={myEmojis} />

      <div className="h-px bg-[#f0e8dc]" />

      {post.comments_enabled ? (
        <div className="flex flex-col gap-3">
          {post.comments.length > 0 && (
            <ul className="flex flex-col gap-3">
              {post.comments.map((c) => (
                <li
                  key={c.id}
                  className="flex items-baseline gap-2 text-sm leading-[1.7]"
                >
                  <Avatar
                    value={c.profiles?.avatar_emoji ?? "🏠"}
                    className="h-5 w-5 self-center text-sm"
                  />
                  <span className="flex-none font-bold text-ink">
                    {c.profiles?.nickname ?? "ゲスト"}
                  </span>
                  <span className="text-ink-soft">{c.body}</span>
                </li>
              ))}
            </ul>
          )}
          <CommentForm postId={post.id} />
        </div>
      ) : (
        <p className="text-[13px] text-ink-soft">
          この投稿はコメントを受け付けていません
        </p>
      )}
    </article>
  );
}
