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
    const filePath = `${fileName}`;

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
      ? `${process.env.SUPABASE_URL}/storage/v1/object/public/avatars/${avatarUrl}`
      : null,
  };
}

export async function updateEmail(newEmail: string) {
  // メールアドレス変更リクエストを送信
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ email: newEmail });

  if (error) return { error: error.message };

  return {
    message:
      'メールアドレス変更リクエストが送信されました。確認メールのリンクをクリックしてください。',
  };
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

// いいねを追加または削除する関数
export async function toggleLike(productId: string, userId: string) {
  const supabase = await createClient();

  // 既に「いいね」しているか確認
  const { data: existingLike, error: fetchError } = await supabase
    .from('likes')
    .select('id')
    .eq('product_id', productId)
    .eq('user_id', userId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    return { error: 'データの取得に失敗しました。' };
  }

  if (existingLike) {
    // 既に「いいね」している場合は削除
    const { error: deleteError } = await supabase
      .from('likes')
      .delete()
      .eq('id', existingLike.id);

    if (deleteError) return { error: 'いいねの削除に失敗しました。' };

    return { message: 'いいねを解除しました。' };
  } else {
    // まだ「いいね」していない場合は追加
    const { error: insertError } = await supabase.from('likes').insert([
      {
        product_id: productId,
        user_id: userId,
      },
    ]);

    if (insertError) return { error: 'いいねの追加に失敗しました。' };

    return { message: 'いいねしました！' };
  }
}

// 各商品のいいね数を取得する関数
export async function getLikesCount() {
  const supabase = await createClient();

  // `group` を使わず、手動で product_id ごとの集計を行う
  const { data, error } = await supabase.from('likes').select('product_id');

  if (error) {
    console.error('いいね数の取得に失敗しました:', error.message);
    return {};
  }

  // 型を明示的に指定し、エラーを防ぐ
  const likeCounts: Record<string, number> = {};
  (data as { product_id: string }[]).forEach((item) => {
    likeCounts[item.product_id] = (likeCounts[item.product_id] || 0) + 1;
  });

  return likeCounts;
}

// 指定した商品がユーザーにいいねされているかを確認する関数
export async function checkUserLike(productId: string, userId?: string) {
  if (!userId) return false; // ユーザー未ログイン時は false を返す

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('likes')
    .select('id')
    .eq('product_id', productId)
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('ユーザーのいいね状況の取得に失敗しました:', error.message);
    return false;
  }

  return !!data;
}
