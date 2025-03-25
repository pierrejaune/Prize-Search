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



-- ✔ USING
-- SELECT / UPDATE / DELETE で適用される条件を指定する。
-- 例：USING (auth.uid() = id);
-- SELECT：ユーザーが自身のプロフィールのみ取得できる。
-- UPDATE：ユーザーが自身のプロフィールのみ更新できる。
-- ✔ WITH CHECK
-- INSERT の際に適用される条件を指定する。
-- 例：WITH CHECK (auth.uid() = id);
-- INSERT：ユーザーが id に自分の auth.uid() を指定している場合のみ挿入を許可。
