'use server';

import { createClient } from '@/lib/supabase/server';

export async function updateProfile({
  username,
  avatarFile,
}: {
  username: string;
  avatarFile: File | null;
}) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (!user.data.user) return { error: 'ユーザーが認証されていません' };

  let avatarUrl = null;

  if (avatarFile) {
    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `${user.data.user.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // 画像をアップロード
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, avatarFile, { upsert: true });

    if (uploadError)
      return { error: `画像アップロード失敗: ${uploadError.message}` };

    avatarUrl = filePath; // DBには相対パスを保存
  }

  // プロフィール更新
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ username, avatar_url: avatarUrl ?? undefined })
    .eq('id', user.data.user.id);

  if (profileError)
    return { error: `プロフィール更新失敗: ${profileError.message}` };

  // 正しいストレージURLを返す
  return {
    avatarUrl: avatarUrl
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${avatarUrl}`
      : null,
  };
}

export async function updateEmail(newEmail: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ email: newEmail });

  return { error: error?.message || null };
}

export async function updatePassword(
  currentPassword: string,
  newPassword: string
) {
  const supabase = await createClient();

  // ユーザーを再認証
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: (await supabase.auth.getUser()).data.user?.email || '',
    password: currentPassword,
  });

  if (signInError) return { error: '現在のパスワードが間違っています' };

  // パスワードを更新
  const { error } = await supabase.auth.updateUser({ password: newPassword });

  return { error: error?.message || null };
}
