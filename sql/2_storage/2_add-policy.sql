-- 自分の画像のみアップロード可能
create policy "Enable insert for authenticated users"
on storage.objects for insert
with check (auth.uid() = owner);

-- 自分の画像のみ取得可能
create policy "Enable select for authenticated users"
on storage.objects for select
using (auth.uid() = owner);

-- ユーザーが自分のアバター画像を更新できるようにするポリシー
create policy "Allow users to update their avatars" on storage.objects
  for update
  using (bucket_id = 'avatars' and auth.uid() is not null);

-- ユーザーが自分のアバター画像を削除できるようにするポリシー
create policy "Allow users to delete their avatars" on storage.objects
  for delete
  using (bucket_id = 'avatars' and auth.uid() is not null);






-- 「Secure email change」の設定
-- Supabaseの Auth > Providers > Email に「Secure email change」の設定があります。
-- これが 有効 になっていると、現在のメールアドレスと新しいメールアドレス 両方に確認メールが送られ、両方の確認が必要 です。
-- これを 無効化 すると、新しいメールアドレスのみに確認メールが送られます。

-- ✅ 対処方法
-- Supabaseの Auth > Providers > Email へ移動
-- 「Secure email change」のチェックを外す
-- 設定を保存して、再度メールアドレス変更を試す
