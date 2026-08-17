# Design System: しゅふようSNS

## 1. Visual Theme & Atmosphere

主婦向けの匿名家事報告SNS。掃除・料理などの家事を投稿し、他ユーザーからスタンプ・コメントで反応をもらえるWebアプリ。
装飾を抑えたクリーンなライトトーンに、暖色（テラコッタ）のブランドアクセントを差し色として使う構成。

**「かしこまらない、主婦用SNSアプリ」**

- 背景は白〜薄いグレーのライト基調、本文はほぼ黒に近いウォームダークグレー（`#3D372C`）で高コントラストに可読性を確保
- 装飾的な写真やグラフィックは最小限
- 角丸は用途によって細かく使い分け（4px〜24px、ボタンやバッジはピル状 `9999px` も使用）— やわらかく親しみやすい印象
- Brand Voice: 言い切るシンプルで軽快なコピー。絵文字的な柔らかさより、実用寄りの安心感を優先
- グラデーションや強い装飾効果（backdrop-blur等）は使用せず、フラットな配色とTailwindの標準的な階調で構成。強い黒（カスタムブラック `#070719`）はモーダルの背景オーバーレイ（70%不透明度）など「集中させたい場面」に限定使用

---

## 2. Color Palette & Roles

### Primary Brand

| 名前 | HEX | Role |
|---|---|---|
| Terracotta (Primary) | `#E08A3E` | プライマリボタン・アクティブ状態・ブランドアクセント |
| Terracotta Dark | `#B8681F` | ホバー・強調テキストなど濃色バリエーション |
| Terracotta Light | `#F2B36B` | サブアクセント、バッジ、アイコンの差し色 |

### Surface & Neutrals

| 名前 | HEX | Role |
|---|---|---|
| Background | `#FAF8F4` | ページ基本背景 |
| Surface Muted | `#F3F0EA` (warm-gray-50) | セクション区切り・カード背景の代替 |
| Surface Alt | `#E8E4DC` (warm-gray-100) | 入力欄背景・非活性状態 |
| Border | `#D8D2C6` (warm-gray-200) | カード・入力欄の境界線 |
| Muted Text BG | `#C2BAA8` (warm-gray-300) | 区切り線・薄いプレースホルダー |
| Overlay Black | `#221C14` (custom warm black) | モーダル背景オーバーレイ（`/70` = 70%不透明度で使用）、強い黒テキスト |

### Text

| 名前 | HEX | Role |
|---|---|---|
| Text Primary | `#3D372C` (warm-gray-800) | 本文・見出しの基本色（html既定色） |
| Text Secondary | `#78715F` (warm-gray-500) | 補助テキスト・キャプション |
| Text Muted | `#A39C89` (warm-gray-400) | プレースホルダー・非活性テキスト |

### Accent

| 名前 | HEX | Role |
|---|---|---|
| Info Blue | `#3B82F6` (blue-500) | リンク・情報表示（ポイント使い限定） |
| Success/Warning Amber | `#FEF08A` 〜 `#A16207` (amber-100〜700) | 注意喚起・警告バッジ |
| Error Red | `#EF4444` (red-500) / 背景 `#FEF2F2` (red-50) | エラーメッセージ・バリデーション表示 |

---

## 3. Typography Rules

### Font Family

```css
/* メイン（和文） */
font-family: 'Noto Sans JP', ui-sans-serif, system-ui, sans-serif;

/* コード・数値等（フォールバック） */
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
```

- **Noto Sans JP**（weight: 400 / 500 / 700 / 900）… 和文本文・見出し全般の基本フォント
- **ui-sans-serif system stack** … 英数字・記号のフォールバック、絵文字表示

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| Display / Hero | `4.5rem` (72px) | 900 | 1.1〜1.2 | normal |
| Section Heading (H2) | `1.875rem` (30px) | 700 | 1.3 | normal |
| Sub Heading (H3) | `22px` | 700 | 1.4 | normal |
| Body | `15px`〜`18px` | 400〜500 | 1.625（leading-relaxed） | normal |
| Caption / Meta | `13px`〜`10px` | 400 | 1.4 | normal |

### Principles

- ウェイトは太字（700/900）を見出しなど「強調したい数字」に限定し、本文は400〜500で軽く保つ
- letter-spacing は基本 `normal`（和文フォントのため字間を詰めすぎない）
- 和欧混植では数字・記号にui-sans-serif、漢字仮名にNoto Sans JPが自然に適用される標準スタックを踏襲する

---

## 4. Component Stylings

### Buttons

**Primary**
- 背景: `#E08A3E`（Terracotta）
- 文字: `#FFFFFF`
- 角丸: `.5rem`〜`9999px`（用途によりピル状も使用）
- パディング: 上下 `.5rem`〜`.75rem` / 左右 `1rem`〜`1.5rem`
- ホバー: 背景をテラコッタの濃色系（`#B8681F`系）へシフト
- フォーカス: `--tw-ring-shadow` によるフォーカスリング表示

**Secondary**
- 背景: `#FFFFFF` または透明
- 文字: `#3D372C`（warm-gray-800）
- ボーダー: `1px solid #D8D2C6`（warm-gray-200）
- 角丸: `.5rem`

### Inputs / Forms

- 背景: `#FFFFFF`（もしくは `#E8E4DC` で非活性/読み取り専用時）
- ボーダー: `1px solid #D8D2C6`（warm-gray-200）
- 角丸: `.375rem`〜`.5rem`
- フォーカス: ボーダー色をTerracottaまたはBlueに変化 + リングシャドウ表示

### Image / Iconography

- アイコンの方針: シンプルな線画/フィル系アイコン（家事カテゴリ・スタンプ・チェックマーク等、投稿UIに準拠した実用アイコン）
- 写真の扱い: 装飾写真はほぼ使用せず、UI・投稿カードが主役
- 装飾要素の方針: 最小限。グラデーションやイラストよりも、差し色と余白でブランドらしさを出す

### Microinteractions

```css
transition: background-color .15s ease, border-color .15s ease; /* 標準ホバー */
transition: opacity .2s ease; /* フェード */
```

- ホバー時はボタン・カードの背景/ボーダー色を滑らかに変化させる程度に留める
- スクロール連動の派手な演出は基本なし（軽量・実用フォーカスのUI）
- `prefers-reduced-motion: reduce` に対応するメディアクエリを尊重し、モーション低減設定時はアニメーションを抑制する

---

## 5. Layout Principles

### Spacing System

- 基本単位: `4px`（Tailwindの標準スペーシングスケールに準拠）
- スケール: 4 / 8 / 12 / 16 / 24 / 32px …
- セクション間: 32px〜48px（PC）/ 16px〜24px（SP）
- カード間: 16px前後のグリッドギャップ

---

## 6. Depth & Elevation

### Shadow Scale

| Level | 値 | 用途 |
|---|---|---|
| Flat | `none` | テキストブロック、背景 |
| Card | `0 1px 2px 0 rgb(0 0 0 / 0.05)` 相当（Tailwind標準shadow-sm） | カード・パネル |
| Hover | わずかに強めたring/shadow | ホバー強調 |
| Modal / Featured | `background-color: #070719b3`（背景オーバーレイ）+ カード本体に強めの影 | モーダル・最前面 |

**Shadow Philosophy**: 影は控えめに、階層の区別が付く最低限のレベルに留める。強い没入感が必要なモーダル背景のみ、濃紺に近い黒 `#070719` を70%不透明度で使用する

### Border Radius Scale

| 値 | 用途 |
|---|---|
| `0` | 装飾なしの要素 |
| `.375rem`（6px） | 入力欄・小さめのバッジ |
| `.5rem`（8px） | ボタン・入力欄の標準 |
| `.75rem`（12px） | カード |
| `1rem`（16px） | 大きめのカード・パネル |
| `1.5rem`（24px） | ヒーロー領域・大きいコンテナ |
| `9999px` | ピルボタン・タグ・アバター |

→ 角丸は「小さい要素ほど控えめ、目立たせたいボタン/タグほどピルに近づける」方針

---

## 7. Do's and Don'ts

### ✅ Do

- 背景は白〜薄いグレー基調を維持し、テラコッタ（`#E08A3E`系）はアクションボタンや強調ポイントに限定して使う
- 有彩色を全体の7%未満にする
- 本文テキストは `#3D372C` を基本とし、十分なコントラストを確保する
- フォームや金額表示はNoto Sans JPの太字（700/900）でメリハリを付ける
- 角丸・余白ともに「やわらかく実用的」なトーンを崩さない（角丸0〜24px、ピルはCTA/タグ限定）
- モーダルや強い集中を要する場面のみ、濃紺の黒 `#070719` を70%オーバーレイとして使う

### ❌ Don't

- ダーク背景をページ全体の基調にしない（`#070719` はオーバーレイ専用、全面背景色として使わない）
- 強いグラデーションやガラスモーフィズム（backdrop-blur等）の装飾効果を追加しない
- テラコッタ以外の派手な原色（紫・ネオン系など）をブランドカラーとして混在させない
- 影を多用して重厚な階層を作らない（フラットに近い軽い影のみ）
- letter-spacingを広げて欧文っぽい張り詰めた見た目にしない（和文フォントの可読性を優先）
- 視認できない小さな文字を記載しない

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | `< 640px` | シングルカラム、ヘッダー縮約、フォームは全幅表示 |
| Tablet | `640px〜1023px` | コンテナ幅 `640px`前後、余白がやや広がる |
| Desktop | `1024px〜1279px` | コンテナ幅 `768px`〜`1024px`、中央寄せレイアウト |
| Wide | `≥ 1280px` | コンテナ最大幅 `1280px`〜`1536px`、左右余白を確保しコンテンツは中央寄せのまま拡張しすぎない |

### Touch Targets

- ボタン・入力欄は最低 `44px` 相当のタップ領域を確保
- モバイルではフォーム項目を縦積みにし、誤タップを避けるため要素間の余白を広めに取る

### Collapsing Strategy

- グリッド縮約: 複数カラム表示は基本なし（元々シングルカラム中心のフォーム型UI）
- ナビ縮約: ヘッダーの項目数が少ないため、ハンバーガー化よりロゴ+最小限リンクのままモバイル最適化
- 画像の挙動: 装飾画像がほぼ無いため、アイコン・ロゴのみ `max-width: 100%` で縮小対応

---

## 9. Agent Prompt Guide

### Quick Reference

```text
背景: #FAF8F4（Surface Muted: #F3F0EA）
本文: #3D372C / 補助 #78715F / プレースホルダー #A39C89
ブランドアクセント: #E08A3E（Terracotta） / ホバー #B8681F
フォント: 'Noto Sans JP', sans-serif
ベースサイズ: 15px〜18px（本文）
セクション余白: 32px〜48px（PC）/ 16px〜24px（SP）
カード角丸: .75rem〜1rem
カード影: shadow-sm相当（控えめ）
```

### Component Prompts (例)

- **ボタン作成**: "Primaryボタンを作って。背景 `#E08A3E`、文字 `#FFFFFF`、パディング `.5rem 1.5rem`、角丸 `9999px`、フォント Noto Sans JP、ホバーで背景を `#B8681F` に変化"
- **カード作成**: "カードを作って。背景 `#FFFFFF`、角丸 `.75rem`、影は控えめなshadow-sm相当、パディング `1.5rem`、ボーダー `1px solid #D8D2C6`"
- **ヒーロー作成**: "白背景に大きめの太字見出し（900ウェイト、Noto Sans JP）でキャッチコピーを配置し、直下にテラコッタのCTAボタンを1つだけ置くシンプルな構成にする"

### Iteration Guide

1. まず背景（白/warm-gray-50）とテキスト（warm-gray-800）のベースコントラストを整える
2. Terracotta（`#E08A3E`）はCTAボタンやアクティブ状態など「ここを押してほしい」箇所にのみ使う
3. 装飾は最小限に。影・角丸・グラデーションを盛りすぎず、フォームと結果表示の可読性を最優先する
4. レスポンシブ確認時は、コンテナ最大幅とシングルカラム構成が崩れていないかをチェックする

---

**Source**: https://walica.jp/new (CSS解析: `/assets/index-*.css` のTailwindコンパイル済みCSSを直接取得・色/角丸/フォント/ブレークポイントを抽出, 2026-08時点)
**Format**: getdesign.md / awesome-design-md 準拠の9セクション構成
**Generated for**: AIコーディングエージェント（Claude Code / Cursor / Stitch / v0 等）
**Maintainer**: (要確認 — サイト運営者にご確認ください)