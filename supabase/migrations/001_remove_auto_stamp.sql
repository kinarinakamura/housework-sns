-- 自動スタンプ機能の削除
-- 既にsupabase/schema.sqlを実行済みのSupabaseプロジェクトに対して、
-- SQL Editorでこの内容を実行してください(新規プロジェクトではschema.sqlのみで十分です)。

drop trigger if exists on_post_created on public.posts;
drop function if exists public.handle_new_post();

drop index if exists public.reactions_unique_user_emoji;
delete from public.reactions where is_system;
alter table public.reactions drop constraint if exists reactions_user_or_system;
alter table public.reactions alter column user_id set not null;
alter table public.reactions drop column if exists is_system;
create unique index if not exists reactions_unique_user_emoji
  on public.reactions (post_id, user_id, emoji);

drop policy if exists "authenticated users can create own reactions" on public.reactions;
create policy "authenticated users can create own reactions"
  on public.reactions for insert
  with check (auth.uid() = user_id);

alter table public.profiles drop column if exists auto_stamp_enabled;
