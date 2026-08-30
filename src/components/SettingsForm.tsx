import { updateProfile } from "@/app/actions";
import { AvatarPicker } from "@/components/AvatarPicker";
import type { Profile } from "@/lib/types";

export function SettingsForm({ profile }: { profile: Profile }) {
  return (
    <form action={updateProfile} className="space-y-6">
      <div>
        <label
          className="mb-1 block text-sm font-medium text-ink-soft"
          htmlFor="nickname"
        >
          ニックネーム
        </label>
        <input
          id="nickname"
          type="text"
          name="nickname"
          maxLength={20}
          defaultValue={profile.nickname}
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-[15px] text-ink focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      <div>
        <span className="mb-1 block text-sm font-medium text-ink-soft">
          アバター
        </span>
        <AvatarPicker defaultValue={profile.avatar_emoji} />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-brand px-5 py-3 text-base font-bold text-white transition-colors hover:bg-brand-dark sm:w-auto"
      >
        保存する
      </button>
    </form>
  );
}
