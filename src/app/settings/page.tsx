import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/SettingsForm";
import type { Profile } from "@/lib/types";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, nickname, avatar_emoji")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/");

  return (
    <div className="mx-auto max-w-md space-y-6 px-4 py-8">
      <Link
        href="/"
        className="inline-block text-sm text-ink-soft transition-colors hover:text-ink"
      >
        ← タイムラインに戻る
      </Link>
      <h1 className="text-xl font-bold text-ink">プロフィール設定</h1>
      <SettingsForm profile={profile as Profile} />
    </div>
  );
}
