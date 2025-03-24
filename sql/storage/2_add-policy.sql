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

