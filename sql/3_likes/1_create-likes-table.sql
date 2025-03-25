-- ==============================
-- 📌 likes テーブルの作成
-- ==============================
CREATE TABLE public.likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,  -- 一意の ID（UUID 自動生成）
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- ユーザー ID（auth.users テーブル参照）
    product_id TEXT NOT NULL,  -- microCMS で管理される product の ID（TEXT 型）
    created_at TIMESTAMP DEFAULT timezone('utc', now()),  -- 作成日時（デフォルトで現在時刻）
    UNIQUE (user_id, product_id)  -- 同じユーザーが同じ商品を複数回登録できないようにする
);
