-- ==============================
-- 📌 likes テーブルの RLS（行レベルセキュリティ）設定
-- ==============================

-- RLS（行レベルセキュリティ）を有効化
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- 自分のデータのみ閲覧可能
CREATE POLICY "ユーザー自身のお気に入りのみ取得"
ON public.likes
FOR SELECT USING (auth.uid() = user_id);

-- 自分のお気に入りのみ登録可能
CREATE POLICY "ユーザー自身のお気に入りのみ登録"
ON public.likes
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 自分のお気に入りのみ削除可能
CREATE POLICY "ユーザー自身のお気に入りのみ削除"
ON public.likes
FOR DELETE USING (auth.uid() = user_id);

-- すべてのユーザーがいいねの総数を取得可能にする
CREATE POLICY "すべてのユーザーがいいねの総数を取得可能"
ON public.likes
FOR SELECT USING (true);

