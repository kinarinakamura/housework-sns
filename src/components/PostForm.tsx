import { createPost } from "@/app/actions";
import { CATEGORIES } from "@/lib/types";
import { TIME_BAND_COPY, getTimeBand } from "@/lib/time-of-day";

export function PostForm() {
  const band = getTimeBand();
  const copy = TIME_BAND_COPY[band];

  return (
    <form
      action={createPost}
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-white px-6 pt-[22px] pb-5 shadow-[0_2px_10px_rgba(120,95,60,0.05)]"
    >
      <h2 className="font-heading text-[17.5px] font-bold text-ink">
        {copy.heading}
      </h2>

      <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((c, i) => (
          <label key={c} className="relative block flex-none">
            <input
              type="radio"
              name="category"
              value={c}
              defaultChecked={i === 0}
              className="peer sr-only"
            />
            <span className="inline-flex cursor-pointer items-center rounded-full border border-[#e7ddd0] bg-white px-[18px] py-2 text-sm font-bold whitespace-nowrap text-ink-soft transition-colors peer-checked:border-brand peer-checked:bg-brand/10 peer-checked:text-brand-dark">
              {c}
            </span>
          </label>
        ))}
      </div>

      <textarea
        name="body"
        maxLength={500}
        rows={4}
        placeholder={copy.placeholder}
        className="w-full resize-y rounded-xl border border-[#e7ddd0] bg-[#fffdfa] px-4 py-3.5 text-[14.5px] leading-[1.75] text-ink transition-colors focus:border-brand focus:outline-none"
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <label className="flex cursor-pointer items-center gap-2.5 select-none">
          <input
            type="checkbox"
            name="commentsEnabled"
            defaultChecked
            className="peer sr-only"
          />
          <span className="grid h-[19px] w-[19px] flex-none place-items-center rounded-[5px] border-[1.5px] border-[#d8ccbc] text-xs text-white transition-colors after:content-[''] peer-checked:border-[#b38858] peer-checked:bg-[#b38858] peer-checked:after:content-['✓']" />
          <span className="text-sm text-ink-soft">コメントを受け付ける</span>
        </label>
        <button
          type="submit"
          className="rounded-full bg-bg-alt px-[26px] py-[11px] text-sm font-bold text-[#8a7c69] shadow-[0_2px_6px_rgba(150,120,85,0.18)] transition-colors group-has-[input[name=category]:checked]:bg-brand group-has-[input[name=category]:checked]:text-white"
        >
          投稿する
        </button>
      </div>
    </form>
  );
}
