-- ==============================
-- 📌 ユーザーごとのお気に入りを取得する関数
-- ==============================
CREATE OR REPLACE FUNCTION public.get_user_likes(uid UUID)
RETURNS TABLE (product_id TEXT) AS $$
BEGIN
    RETURN QUERY
    SELECT likes.product_id FROM public.likes
    WHERE likes.user_id = uid;
END;
$$ LANGUAGE plpgsql STABLE;
