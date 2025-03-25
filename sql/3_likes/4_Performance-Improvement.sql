-- product_id で検索が高速になるようにインデックスを追加
CREATE INDEX idx_likes_product_id ON public.likes (product_id);

-- user_id で検索が高速になるようにインデックスを追加
CREATE INDEX idx_likes_user_id ON public.likes (user_id);
