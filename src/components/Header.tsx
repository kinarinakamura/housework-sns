import Link from "next/link";
import type { Profile } from "@/lib/types";

export function Header({ profile }: { profile: Profile }) {
  return (
    <header className="flex items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-black tracking-tight text-ink">
          しゅふよう
        </h1>
        <p className="text-xs text-ink-soft">かしこまらない、主婦用SNS</p>
      </div>
      <Link
        href="/settings"
        className="flex flex-none items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-sm text-ink transition-colors hover:border-border-muted"
      >
        <span className="text-lg">{profile.avatar_emoji}</span>
        <span className="max-w-[8rem] truncate font-medium">
          {profile.nickname}
        </span>
      </Link>
    </header>
  );
}
