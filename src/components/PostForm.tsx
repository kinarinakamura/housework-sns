import { createPost } from "@/app/actions";
import { CATEGORIES } from "@/lib/types";
import { TIME_BAND_COPY, getTimeBand } from "@/lib/time-of-day";

export function PostForm() {
  const band = getTimeBand();
  const copy = TIME_BAND_COPY[band];

  return (
    <form
      action={createPost}
      className="rounded-xl border border-border bg-white p-4 shadow-sm sm:p-5"
    >
      <h2 className="text-lg font-bold text-ink">{copy.heading}</h2>

      <div className="mt-3 flex flex-wrap gap-2">
        {CATEGORIES.map((c, i) => (
          <label key={c} className="relative block">
            <input
              type="radio"
              name="category"
              value={c}
              defaultChecked={i === 0}
              className="peer sr-only"
            />
            <span className="inline-flex cursor-pointer items-center rounded-full border border-border bg-white px-3 py-1 text-sm text-ink-soft transition-colors peer-checked:border-brand peer-checked:bg-brand-light/30 peer-checked:text-brand-dark">
              {c}
            </span>
          </label>
        ))}
      </div>

      <textarea
        name="body"
        maxLength={500}
        rows={3}
        placeholder={copy.placeholder}
        className="mt-3 w-full resize-none rounded-lg border border-border bg-white px-3 py-2 text-[15px] text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="commentsEnabled"
            defaultChecked
            className="h-4 w-4 rounded border-border text-brand focus:ring-brand"
          />
          コメントを受け付ける
        </label>
        <button
          type="submit"
          className="rounded-full bg-brand px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
        >
          投稿する
        </button>
      </div>
    </form>
  );
}
