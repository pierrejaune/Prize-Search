CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  user_icon TEXT, -- 画像のURLを保存する
  created_at TIMESTAMP DEFAULT now()
);
