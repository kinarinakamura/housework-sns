import { createComment } from "@/app/actions";

export function CommentForm({ postId }: { postId: string }) {
  return (
    <form action={createComment.bind(null, postId)} className="flex gap-2">
      <input
        type="text"
        name="body"
        maxLength={300}
        required
        placeholder="コメントする..."
        className="flex-1 rounded-lg border border-border bg-white px-3 py-1.5 text-sm text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
      />
      <button
        type="submit"
        className="flex-none rounded-lg bg-brand px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
      >
        送信
      </button>
    </form>
  );
}
