-- profiles テーブル作成
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL DEFAULT '新規ユーザー',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Row Level Security を有効化
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- SELECT: 自分のプロフィールを取得できる
CREATE POLICY "Authenticated users can select their own profile"
ON profiles
FOR SELECT
TO public
USING (auth.uid() = id);

-- UPDATE: 自分のプロフィールを更新できる
CREATE POLICY "Authenticated users can update their own profile"
ON profiles
FOR UPDATE
TO public
USING (auth.uid() = id);

-- INSERT: 自分のプロフィールのみ作成できる
CREATE POLICY "Authenticated users can insert their own profile"
ON profiles
FOR INSERT
TO public
WITH CHECK (auth.uid() = id);

-- トリガー関数作成 (auth.users にユーザーが作成されたら profiles にも挿入)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, '新規ユーザー');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- トリガー作成
CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- 既存ユーザーの profiles データを補完
INSERT INTO profiles (id, username)
SELECT id, '新規ユーザー' FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles);
