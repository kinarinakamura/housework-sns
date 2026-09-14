-- 投稿本文を任意入力にする(カテゴリ・スタンプのみでも投稿できるように)
-- 既にsupabase/schema.sqlを実行済みのSupabaseプロジェクトに対して、
-- SQL Editorでこの内容を実行してください(新規プロジェクトではschema.sqlのみで十分です)。

alter table public.posts alter column body set default '';
alter table public.posts drop constraint if exists posts_body_check;
alter table public.posts add constraint posts_body_check check (char_length(body) <= 500);
