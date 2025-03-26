# Prize Search

## デモ URL

[https://prize-search.vercel.app](https://prize-search.vercel.app)

## デモ URL の認証情報

- **メールアドレス**: fujiwarademotest@gmail.com
- **パスワード**: testuser

---

## 概要

**Prize Search** は、ゲームセンターで獲得できる景品を検索できるアプリです。これを利用することで、ユーザーは欲しい景品があるゲームセンターを効率的に見つけることができ、無駄な時間や交通費を削減できます。

### **景品情報の管理**

- 景品情報は **microCMS** で管理。
- 最初は **CSV ファイル** で一括入力。
- 以降の更新は **公開・非公開設定** で管理。
- 追加・削除も **microCMS** 側で可能。
- この景品情報を基に、 **トップページ・景品詳細ページ** を作成。

### **会員登録とお気に入り機能**

- **Supabase** を使用して **会員登録** を実装。
- **お気に入りの景品** を登録・削除可能。
- `likes` テーブルを Supabase に作成し、`user_id` と `product_id` を紐づけて集計。
- **会員登録していなくても、いいねの数は閲覧可能**。

### **マイページ機能**

- ユーザーは **マイページ** で以下の情報を変更可能:
  - ユーザー名
  - アバター画像
  - メールアドレス
  - パスワード
- **マイページへのアクセス制限** を実装。

### **レスポンシブ対応**

- スマートフォン・タブレット・PC で快適に利用可能。

---

## 機能一覧

- **景品情報の閲覧**
- **絞り込み検索**
- **会員登録・ログイン機能**
- **マイページ機能**（ユーザー名・アバター画像・メール・パスワード変更）
- **お気に入りページでのいいねした景品情報の閲覧**
- **マイページ (`/mypage`) へのアクセス制限**
- **会員登録していなくてもいいね数を表示**

---

## 使用技術

### **フレームワーク・ライブラリ**

| ライブラリ名                           | 用途                                                 |
| -------------------------------------- | ---------------------------------------------------- |
| Next.js 15.2.2                         | フロントエンドフレームワーク                         |
| React 19.0.0                           | UI 構築                                              |
| Tailwind CSS                           | スタイリング                                         |
| shadcn-ui                              | UI コンポーネントライブラリ                          |
| @supabase/supabase-js                  | Supabase との連携                                    |
| @supabase/ssr                          | サーバーサイドで Supabase を利用するためのライブラリ |
| microcms-js-sdk                        | microCMS とのデータ連携                              |
| react-hook-form                        | フォーム管理                                         |
| zod                                    | フォームバリデーション                               |
| date-fns                               | 日付管理                                             |
| clsx                                   | クラス名の動的管理                                   |
| lucide-react                           | アイコンライブラリ                                   |
| radix-ui (Avatar, Dialog, Label, Slot) | UI コンポーネント                                    |

### **開発ツール**

| ツール       | 用途             |
| ------------ | ---------------- |
| TypeScript   | 型安全な開発     |
| ESLint       | コード品質向上   |
| PostCSS      | CSS 処理         |
| Autoprefixer | CSS の互換性向上 |

---

## **使用している外部 API**

- **Supabase**：認証、お気に入りデータの管理
- **microCMS**：景品データの管理

---

## **セットアップ**

### **ローカル環境の構築**

1. **リポジトリをクローン**
   ```sh
   git clone https://github.com/your-repo/prize-search.git
   cd prize-search
   ```
2. **依存関係をインストール**
   ```sh
   yarn install
   ```
3. **環境変数を設定**
   `.env.local` を作成し、以下のように設定:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   MICROCMS_API_KEY=your-microcms-api-key
   ```
4. **開発サーバーを起動**
   ```sh
   yarn dev
   ```

これで `http://localhost:3000` でアプリを確認できます。

---

## **デプロイ**

1. **Vercel にデプロイ**
   ```sh
   vercel
   ```
2. **環境変数を Vercel に設定**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `MICROCMS_API_KEY`

デプロイが完了すると、指定の URL でアプリが利用可能になります。

---

## **ライセンス**

MIT License
