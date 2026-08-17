# しゅふよう

かしこまらない、主婦用SNS。本名・顔写真不要、ニックネームとアバターだけで参加できる匿名家事報告アプリ。

Next.js (App Router) + Supabase (Postgres / Auth) 構成のMVPです。

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabaseプロジェクトの準備

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. Authentication > Sign In / Providers で **Anonymous Sign-ins** を有効化
3. SQL Editor で [`supabase/schema.sql`](./supabase/schema.sql) の内容を実行

### 3. 環境変数の設定

```bash
cp .env.local.example .env.local
```

`.env.local` に SupabaseプロジェクトのURLとanonキー(Project Settings > API)を設定してください。

### 4. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開いて確認できます。

## 機能

- **匿名参加**: 本名・顔写真・位置情報不要。ニックネーム+絵文字アバターのみ
- **家事カテゴリ限定投稿**: 掃除・洗濯・料理・片付け・その他
- **やさしいスタンプ**: 👏すごい！ / 🌿おつかれ / 😌わかる / 💛今日はいいよ(ランキング・フォロワー数などの競争要素はなし)
- **投稿ごとのコメントON/OFF**
- **自動スタンプ**: 投稿すると(設定でON/OFF可)システムから🌿スタンプが自動で届き、無反応な投稿を減らす
- **時間帯で変わる投稿フォームの見出し**: 朝/昼/夜/深夜で問いかけが変化
- **タイムライン**: 全体 / カテゴリ別

## ディレクトリ構成

```
src/
  app/            App Router のページ・Server Actions
  components/     UIコンポーネント
  lib/
    supabase/     Supabaseクライアント(ブラウザ/サーバー)
    types.ts      カテゴリ・スタンプ・型定義
supabase/
  schema.sql      テーブル・RLSポリシー・トリガー定義
```

## 技術スタック

- [Next.js](https://nextjs.org) (App Router, Server Actions)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Supabase](https://supabase.com) (Postgres, Auth, Row Level Security)
