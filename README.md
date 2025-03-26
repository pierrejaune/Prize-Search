# Prize Search

## デモ URL

[https://prize-search.vercel.app](https://prize-search.vercel.app)

### デモ用認証情報

- **メールアドレス**: fujiwarademotest@gmail.com
- **パスワード**: testuser

---

## 要件定義

- ゲームセンターで獲得できる景品を検索できるアプリ。
  - ユーザーが欲しい景品を提供しているゲームセンターを特定し、無駄な時間と交通費を削減。
- 景品情報の管理
  - 初回は microCMS に CSV で一括登録。
  - 以降は microCMS で公開・非公開を管理。
  - 追加したいゲームセンターがある場合も microCMS 側で管理。
- supabase による会員登録
  - ログインユーザーは景品をお気に入りに追加・削除可能。
  - `likes` テーブルで `user_id` と `product_id` を紐付け。
  - 会員登録していなくても「いいね」の数は表示。
- マイページ機能
  - ユーザー名、アバター画像、メールアドレス、パスワード変更が可能。
- レスポンシブ対応

---

## 機能一覧

- **景品情報閲覧**
- **絞り込み検索**
- **会員登録・ログイン**
- **マイページ機能**
  - ユーザー名変更
  - アバター画像変更
  - メールアドレス変更
  - パスワード変更
- **お気に入り機能**
  - お気に入り追加・削除
  - お気に入り一覧の閲覧
  - 会員登録なしでも「いいね」数を表示
- **アクセス制限**
  - `/mypage` へのアクセス制限

---

## 使用技術

### フレームワーク・ライブラリ

- **Next.js 15.2.2** - React ベースのフルスタックフレームワーク
- **React 19.0.0** - UI コンポーネントライブラリ
- **Tailwind CSS 3.4.17** - ユーティリティファーストの CSS フレームワーク
- **shadcn/ui 0.9.5** - Radix UI ベースのコンポーネントライブラリ
- **zod 3.24.2** - スキーマバリデーション
- **@supabase/supabase-js 2.49.1** - Supabase クライアントライブラリ
- **@supabase/ssr 0.6.1** - Supabase のサーバーサイドレンダリング対応ライブラリ
- **microcms-js-sdk 3.1.0** - microCMS の API クライアント
- **react-hook-form 7.54.2** - フォーム管理
- **@hookform/resolvers 4.1.3** - react-hook-form 用のバリデーションスキーマ連携
- **@radix-ui/react-avatar 1.1.3** - アバター UI コンポーネント
- **@radix-ui/react-dialog 1.1.6** - ダイアログ UI コンポーネント
- **@radix-ui/react-label 2.1.2** - ラベル UI コンポーネント
- **@radix-ui/react-slot 1.1.2** - Slot 機能の提供
- **lucide-react 0.482.0** - アイコンライブラリ
- **clsx 2.1.1** - クラス名の条件付け
- **date-fns 4.1.0** - 日付処理
- **tailwind-merge 3.0.2** - Tailwind クラスの最適化
- **tailwindcss-animate 1.0.7** - Tailwind CSS 用のアニメーションプラグイン

### 開発ツール

- **TypeScript 5** - 型安全な JavaScript
- **ESLint 9** - コードリントツール
- **Prettier** - コードフォーマッター
- **postcss 8.5.3** - CSS 処理ツール
- **autoprefixer 10.4.21** - CSS ベンダープレフィックス自動付与

---

## 使用している外部 API

- **Supabase** - 認証・データベース・ストレージ管理
- **microCMS** - コンテンツ管理システム (CMS)
