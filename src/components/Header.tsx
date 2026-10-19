import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import type { Profile } from "@/lib/types";

export function Header({ profile }: { profile: Profile }) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-[27px] leading-tight font-bold tracking-[0.02em] text-ink">
          Ottsu
        </h1>
      </div>
      <Link
        href="/settings"
        className="flex flex-none items-center gap-2.5 rounded-2xl border border-[#ebe2d6] bg-white py-2 pr-4 pl-3 text-sm no-underline shadow-[0_1px_2px_rgba(90,70,45,0.04)] transition-colors hover:border-[#e0cfb8] hover:no-underline"
      >
        <Avatar value={profile.avatar_emoji} className="h-[26px] w-[26px] text-base" />
        <span className="max-w-[8rem] truncate font-medium text-ink">
          {profile.nickname}
        </span>
      </Link>
    </header>
  );
}
