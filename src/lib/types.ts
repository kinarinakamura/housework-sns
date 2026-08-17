export const CATEGORIES = ["掃除", "洗濯", "料理", "片付け", "その他"] as const;

export type Category = (typeof CATEGORIES)[number];

export const REACTIONS = [
  { emoji: "👏", label: "すごい！" },
  { emoji: "🌿", label: "おつかれ" },
  { emoji: "😌", label: "わかる" },
  { emoji: "💛", label: "今日はいいよ" },
] as const;

export type ReactionEmoji = (typeof REACTIONS)[number]["emoji"];

export const SYSTEM_STAMP_EMOJI = "🌿";

export const AVATAR_EMOJIS = [
  "🏠",
  "🍀",
  "🧺",
  "🍚",
  "🧹",
  "🧽",
  "🐣",
  "🌷",
  "🐻",
  "🐱",
  "🧸",
  "☕",
] as const;

export type Profile = {
  id: string;
  nickname: string;
  avatar_emoji: string;
  auto_stamp_enabled: boolean;
};

export type PostWithRelations = {
  id: string;
  category: string;
  body: string;
  comments_enabled: boolean;
  created_at: string;
  profiles: Profile | null;
  reactions: { emoji: string; user_id: string | null; is_system: boolean }[];
  comments: CommentWithProfile[];
};

export type CommentWithProfile = {
  id: string;
  body: string;
  created_at: string;
  profiles: Profile | null;
};
