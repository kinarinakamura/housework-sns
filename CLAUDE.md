# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## プロジェクト概要

しゅふよう — 本名・顔写真・位置情報不要で、ニックネームと絵文字アバターだけで参加できる、かしこまらない匿名家事報告SNS。固定の家事カテゴリで投稿し、いいね/フォロワー数のような競争要素の代わりに「スタンプ」でやさしく反応し合う。日本語アプリのため、UI文言・コードコメントは日本語。

Next.js 16 (App Router, Server Actions, Tailwind CSS v4) + Supabase (Postgres, Auth, Row Level Security) 構成。現状MVPのスキャフォールド段階(`git log` はコミット1件のみ)。

## コマンド

```bash
npm run dev      # 開発サーバー起動 (localhost:3000)
npm run build    # 本番ビルド
npm run start    # 本番ビルドの起動
npm run lint     # eslint (flat config, next core-web-vitals + typescript)
```

テストスイートは未整備。`tsc --noEmit` の npm script も無いため、型チェックは `npx tsc --noEmit` を手動実行する。

### Supabaseセットアップ

DBスキーマとRLSポリシーは `supabase/schema.sql` にまとまっており、新規Supabaseプロジェクトの SQL Editor で内容を実行する。アプリ全体が `supabase.auth.signInAnonymously()` で認証する構成のため、Supabase Auth設定で **Anonymous Sign-ins**(Authentication > Sign In / Providers)を有効化しておく必要がある。環境変数は `.env.local`(`.env.local.example` 参照)に `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` を設定する。

## アーキテクチャ

**認証フロー**: ログインフォームは存在しない。`startSession`(`src/app/actions.ts`)が `signInAnonymously()` を呼ぶと、DBトリガー(`supabase/schema.sql` の `handle_new_user`)がゲスト名入りの `profiles` 行を自動作成し、続けてServer Actionがそのユーザーの選んだニックネーム/アバターで行を更新する。`src/app/page.tsx` は、未認証またはプロフィール未作成の間は `OnboardingForm` を、それ以外はタイムラインを描画する。

**書き込みはすべてServer Action経由。** `createPost`・`toggleReaction`・`createComment`・`updateProfile`・`startSession` などのミューテーションはすべて `src/app/actions.ts` に集約されており、サーバー用Supabaseクライアントを使い、クライアント側のキャッシュ更新にデータを返す代わりに `revalidatePath` を呼ぶ。APIルート層は存在せず、クライアントコンポーネントはこれらのActionを直接呼び出す。

**Supabaseクライアントは2種類 + proxy**(`@supabase/ssr` の作法通り):
- `src/lib/supabase/client.ts` — ブラウザ用クライアント(クライアントコンポーネント向け)。
- `src/lib/supabase/server.ts` — Server Components/Actions向けのサーバークライアント。`next/headers` のcookieを利用。`setAll` がエラー時に何もしないのは意図的な設計(Server Componentsはcookieを設定できず、セッションのリフレッシュはproxy側が担当するため)。
- `src/lib/supabase/middleware.ts` の `updateSession` がリクエストごとに認証トークンをリフレッシュし、`src/proxy.ts` から呼び出される。
- **`src/proxy.ts` は本バージョンのNext.jsにおける `middleware.ts` の後継ファイル**(Next 16でリネームされた。詳細は `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md` を参照)。`middleware.ts` を新たに作らないこと。

**データモデル**(`supabase/schema.sql`): `profiles`(`auth.users` と1:1)→ `posts` → `reactions`・`comments`。`reactions` は `is_system` フラグを持つ。ユーザー由来のリアクションは `REACTIONS`(`src/lib/types.ts`)にある4種類の絵文字に限定され、`(post_id, user_id, emoji)` の一意制約がある。一方システムリアクション(`is_system = true`、`user_id` は null)は `handle_new_post` トリガーが挿入するもので、投稿者の `profiles.auto_stamp_enabled` が有効な場合に投稿ごとへ🌿の自動スタンプを付与する。全テーブルでRLSが有効になっており、挿入は常に `auth.uid()` に紐づく。自動スタンプ用トリガーが `security definer` で動くのは、クライアントが自分でシステムリアクションを挿入できないようにするため。

**共通の語彙は `src/lib/types.ts` に集約**: `CATEGORIES`・`REACTIONS`・`AVATAR_EMOJIS` が正となる許可リストで、UIコンポーネントと `actions.ts` のバリデーション(`pickValid`)の両方がこの配列を参照する。カテゴリ/リアクション/アバターの選択肢を増やす場合はこのファイルを編集すればよい(ただし `schema.sql` 側に特定の値を前提にした `check` 制約やインデックスがあれば併せて確認する)。

**タイムラインのクエリ**(`src/app/page.tsx`)は、`profiles`/`reactions`/`comments` をFKリレーション経由でネストした1回のSupabase `select` にまとめて取得しており(個別に往復しない)、`?category=` のsearch paramでカテゴリ絞り込みを行う。

**デザインシステム**: `DESIGN.md` に、参考サイトから抽出した配色・タイポグラフィ・余白・コンポーネントスタイルなど、ビジュアル仕様一式がまとまっている。新しいUIをスタイリングする前に参照すること(暖色/テラコッタ基調のパレット、Tailwind v4、Noto Sans JP、影・グラデーションは最小限)。
