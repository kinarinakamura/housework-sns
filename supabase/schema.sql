-- しゅふようSNS: 初期スキーマ
-- Supabaseダッシュボードの SQL Editor でこのファイルの内容を実行してください。
-- 事前に Authentication > Sign In / Providers > Anonymous Sign-ins を有効にしてください。

-- プロフィール(匿名ユーザーのニックネーム等)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nickname text not null,
  avatar_emoji text not null default '🏠',
  auto_stamp_enabled boolean not null default true,
  created_at timestamptz not null default now()
);

-- 家事投稿
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  category text not null,
  body text not null check (char_length(body) between 1 and 500),
  comments_enabled boolean not null default true,
  created_at timestamptz not null default now()
);

-- スタンプ(リアクション)。is_system = true はシステムからの自動スタンプで user_id は null になる
create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid references public.profiles (id) on delete cascade,
  emoji text not null,
  is_system boolean not null default false,
  created_at timestamptz not null default now(),
  constraint reactions_user_or_system check (
    (is_system = false and user_id is not null)
    or (is_system = true and user_id is null)
  )
);

-- ユーザー由来のスタンプは同じ投稿・同じ絵文字を二重に押せないようにする
create unique index if not exists reactions_unique_user_emoji
  on public.reactions (post_id, user_id, emoji)
  where is_system = false;

-- コメント
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 300),
  created_at timestamptz not null default now()
);

create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists posts_category_idx on public.posts (category);
create index if not exists reactions_post_id_idx on public.reactions (post_id);
create index if not exists comments_post_id_idx on public.comments (post_id);

-- 匿名サインアップ時に自動でプロフィールを作成
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, nickname)
  values (new.id, 'ゲスト' || substr(replace(new.id::text, '-', ''), 1, 4));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 投稿作成時、投稿者が自動スタンプを許可していればシステムスタンプを1つ付与する
-- (definer function なので RLS を経由せず実行され、投稿者以外のクライアントには
--  system スタンプの直接挿入権限を与えない)
create or replace function public.handle_new_post()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  wants_stamp boolean;
begin
  select auto_stamp_enabled into wants_stamp
  from public.profiles
  where id = new.user_id;

  if coalesce(wants_stamp, false) then
    insert into public.reactions (post_id, user_id, emoji, is_system)
    values (new.id, null, '🌿', true);
  end if;

  return new;
end;
$$;

drop trigger if exists on_post_created on public.posts;
create trigger on_post_created
  after insert on public.posts
  for each row execute function public.handle_new_post();

-- RLS(行レベルセキュリティ)
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.reactions enable row level security;
alter table public.comments enable row level security;

create policy "profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "posts are viewable by everyone"
  on public.posts for select
  using (true);

create policy "authenticated users can create own posts"
  on public.posts for insert
  with check (auth.uid() = user_id);

create policy "users can delete own posts"
  on public.posts for delete
  using (auth.uid() = user_id);

create policy "reactions are viewable by everyone"
  on public.reactions for select
  using (true);

create policy "authenticated users can create own reactions"
  on public.reactions for insert
  with check (auth.uid() = user_id and is_system = false);

create policy "users can delete own reactions"
  on public.reactions for delete
  using (auth.uid() = user_id);

create policy "comments are viewable by everyone"
  on public.comments for select
  using (true);

create policy "authenticated users can create own comments"
  on public.comments for insert
  with check (auth.uid() = user_id);

create policy "users can delete own comments"
  on public.comments for delete
  using (auth.uid() = user_id);
