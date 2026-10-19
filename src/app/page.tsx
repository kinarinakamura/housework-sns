import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "@/components/OnboardingForm";
import { Header } from "@/components/Header";
import { PostForm } from "@/components/PostForm";
import { CategoryTabs } from "@/components/CategoryTabs";
import { PostCard } from "@/components/PostCard";
import { CATEGORIES, type PostWithRelations, type Profile } from "@/lib/types";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <OnboardingForm />;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, nickname, avatar_emoji")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return <OnboardingForm />;
  }

  const { category: categoryParam } = await searchParams;
  const activeCategory = CATEGORIES.find((c) => c === categoryParam);

  let query = supabase
    .from("posts")
    .select(
      `id, category, body, comments_enabled, created_at,
       profiles ( id, nickname, avatar_emoji ),
       reactions ( emoji, user_id ),
       comments ( id, body, created_at, profiles ( id, nickname, avatar_emoji ) )`,
    )
    .order("created_at", { ascending: false })
    .limit(50);

  if (activeCategory) {
    query = query.eq("category", activeCategory);
  }

  const { data: posts } = await query;
  const postList = (posts ?? []) as unknown as PostWithRelations[];

  return (
    <div className="mx-auto flex max-w-[660px] flex-col gap-[22px] px-4 py-10 pb-24">
      <Header profile={profile as Profile} />
      <PostForm />
      <CategoryTabs active={activeCategory} />
      <div className="flex flex-col gap-4">
        {postList.map((post) => (
          <PostCard key={post.id} post={post} currentUserId={user.id} />
        ))}
        {postList.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#e7ddd0] bg-white px-6 py-11 text-center text-sm leading-[1.9] text-ink-soft">
            このカテゴリの投稿はまだありません。
            <br />
            最初のひとことを書いてみませんか。
          </div>
        )}
      </div>
    </div>
  );
}
