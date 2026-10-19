import { createComment } from "@/app/actions";

export function CommentForm({ postId }: { postId: string }) {
  return (
    <form
      action={createComment.bind(null, postId)}
      className="group flex gap-2.5"
    >
      <input
        type="text"
        name="body"
        maxLength={300}
        required
        placeholder="コメントする..."
        className="min-w-0 flex-1 rounded-[10px] border border-[#e7ddd0] bg-[#fffdfa] px-3.5 py-2.5 text-sm text-ink transition-colors focus:border-brand focus:outline-none"
      />
      <button
        type="submit"
        className="flex-none rounded-[10px] bg-bg-alt px-[18px] py-2.5 text-sm font-bold text-[#8a7c69] transition-colors group-has-[input[name=body]:not(:placeholder-shown)]:bg-brand group-has-[input[name=body]:not(:placeholder-shown)]:text-white"
      >
        送信
      </button>
    </form>
  );
}
