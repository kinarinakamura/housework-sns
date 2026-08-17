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
    .select("id, nickname, avatar_emoji, auto_stamp_enabled")
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
       profiles ( id, nickname, avatar_emoji, auto_stamp_enabled ),
       reactions ( emoji, user_id, is_system ),
       comments ( id, body, created_at, profiles ( id, nickname, avatar_emoji, auto_stamp_enabled ) )`,
    )
    .order("created_at", { ascending: false })
    .limit(50);

  if (activeCategory) {
    query = query.eq("category", activeCategory);
  }

  const { data: posts } = await query;
  const postList = (posts ?? []) as unknown as PostWithRelations[];

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <Header profile={profile as Profile} />
      <PostForm />
      <CategoryTabs active={activeCategory} />
      <div className="space-y-4">
        {postList.map((post) => (
          <PostCard key={post.id} post={post} currentUserId={user.id} />
        ))}
        {postList.length === 0 && (
          <p className="py-12 text-center text-sm text-ink-faint">
            まだ投稿がありません。最初の投稿をしてみましょう。
          </p>
        )}
      </div>
    </div>
  );
}
