"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { AVATAR_EMOJIS, CATEGORIES, REACTIONS } from "@/lib/types";

function pickValid<T extends string>(
  value: FormDataEntryValue | null,
  allowed: readonly T[],
  fallback: T,
): T {
  const str = typeof value === "string" ? value : "";
  return (allowed as readonly string[]).includes(str) ? (str as T) : fallback;
}

export async function startSession(formData: FormData) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.user) {
    throw new Error("セッションの開始に失敗しました");
  }

  const nicknameRaw = String(formData.get("nickname") ?? "").trim();
  const nickname = nicknameRaw.length > 0 ? nicknameRaw.slice(0, 20) : "ゲスト";
  const avatarEmoji = pickValid(
    formData.get("avatarEmoji"),
    AVATAR_EMOJIS,
    AVATAR_EMOJIS[0],
  );

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ nickname, avatar_emoji: avatarEmoji })
    .eq("id", data.user.id);

  if (profileError) {
    throw new Error("プロフィールの作成に失敗しました");
  }

  revalidatePath("/");
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("ログインが必要です");

  const nicknameRaw = String(formData.get("nickname") ?? "").trim();
  const nickname = nicknameRaw.length > 0 ? nicknameRaw.slice(0, 20) : "ゲスト";
  const avatarEmoji = pickValid(
    formData.get("avatarEmoji"),
    AVATAR_EMOJIS,
    AVATAR_EMOJIS[0],
  );
  const autoStampEnabled = formData.get("autoStampEnabled") === "on";

  const { error } = await supabase
    .from("profiles")
    .update({
      nickname,
      avatar_emoji: avatarEmoji,
      auto_stamp_enabled: autoStampEnabled,
    })
    .eq("id", user.id);

  if (error) throw new Error("プロフィールの更新に失敗しました");

  revalidatePath("/");
  revalidatePath("/settings");
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("ログインが必要です");

  const category = pickValid(formData.get("category"), CATEGORIES, "その他");
  const body = String(formData.get("body") ?? "").trim();
  if (body.length < 1 || body.length > 500) {
    throw new Error("投稿内容は1〜500文字で入力してください");
  }
  const commentsEnabled = formData.get("commentsEnabled") === "on";

  const { error } = await supabase.from("posts").insert({
    user_id: user.id,
    category,
    body,
    comments_enabled: commentsEnabled,
  });

  if (error) throw new Error("投稿に失敗しました");

  revalidatePath("/");
}

const REACTION_EMOJIS = REACTIONS.map((r) => r.emoji);

export async function toggleReaction(postId: string, emoji: string) {
  if (!REACTION_EMOJIS.includes(emoji as (typeof REACTION_EMOJIS)[number])) {
    return;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("ログインが必要です");

  const { data: existing } = await supabase
    .from("reactions")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .eq("emoji", emoji)
    .eq("is_system", false)
    .maybeSingle();

  if (existing) {
    await supabase.from("reactions").delete().eq("id", existing.id);
  } else {
    await supabase.from("reactions").insert({
      post_id: postId,
      user_id: user.id,
      emoji,
      is_system: false,
    });
  }

  revalidatePath("/");
}

export async function createComment(postId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("ログインが必要です");

  const body = String(formData.get("body") ?? "").trim();
  if (body.length < 1 || body.length > 300) {
    throw new Error("コメントは1〜300文字で入力してください");
  }

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    user_id: user.id,
    body,
  });

  if (error) throw new Error("コメントの投稿に失敗しました");

  revalidatePath("/");
}
