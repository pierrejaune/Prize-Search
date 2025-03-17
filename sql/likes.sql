CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL, -- microCMSのproduct.idを保存
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE (user_id, product_id) -- 同じユーザーが同じ商品に複数回いいねできないよう制約
);
