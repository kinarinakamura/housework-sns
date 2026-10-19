export const CATEGORIES = ["掃除", "洗濯", "料理", "片付け", "その他"] as const;

export type Category = (typeof CATEGORIES)[number];

export const REACTIONS = [
  { emoji: "👏", label: "おつかれ" },
  { emoji: "❤️", label: "ステキ！" },
  { emoji: "✨", label: "すごい！" },
  { emoji: "😌", label: "わかる" },
] as const;

export type ReactionEmoji = (typeof REACTIONS)[number]["emoji"];

export const AVATAR_EMOJIS = [
  "🐱",
  "🐻",
  "🐨",
  "🐰",
  "🐥",
  "color:orange",
  "color:yellow",
  "color:pink",
  "color:blue",
  "color:purple",
] as const;

// "color:" 始まりのアバターは絵文字ではなく、このグラデーションで塗りつぶして表示する
export const AVATAR_COLORS: Record<string, string> = {
  "color:orange": "linear-gradient(135deg, #e3b790, #c98b5e)",
  "color:yellow": "linear-gradient(135deg, #e6d4a0, #cdb26b)",
  "color:pink": "linear-gradient(135deg, #e6bcc3, #c98d99)",
  "color:blue": "linear-gradient(135deg, #a9bdd0, #7c97b0)",
  "color:purple": "linear-gradient(135deg, #c3b5d0, #9a88ae)",
};

export type Profile = {
  id: string;
  nickname: string;
  avatar_emoji: string;
};

export type PostWithRelations = {
  id: string;
  category: string;
  body: string;
  comments_enabled: boolean;
  created_at: string;
  profiles: Profile | null;
  reactions: { emoji: string; user_id: string }[];
  comments: CommentWithProfile[];
};

export type CommentWithProfile = {
  id: string;
  body: string;
  created_at: string;
  profiles: Profile | null;
};
