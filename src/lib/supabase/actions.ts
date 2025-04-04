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
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarUrl}`
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

  // いいね状態を反転する
  const { error, data: existingLike } = await supabase
    .from('likes')
    .select('id')
    .eq('product_id', productId)
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    return { error: 'データの取得に失敗しました。' };
  }

  if (existingLike) {
    // いいね解除（即時反映）
    await supabase.from('likes').delete().eq('id', existingLike.id);
    return { liked: false };
  } else {
    // いいね追加（即時反映）
    await supabase
      .from('likes')
      .insert([{ product_id: productId, user_id: userId }]);
    return { liked: true };
  }
}

// 各商品のいいね数を取得する関数
export async function getLikesCount() {
  const supabase = await createClient();

  // group を使わず、手動で product_id ごとの集計を行う
  const { data, error } = await supabase.from('likes').select('product_id');

  if (error) {
    console.error('いいね数の取得に失敗しました:', error.message);
    return {};
  }

  // *reduce を使って集計処理を最適化
  // { product_id: string }[]は　product_id を持つオブジェクトの 配列

  // accumulator[item.product_id] || 0でaccumulatorにitem.product_id（現在のproduct_id）がすでに存在する→その現在の値を取得。存在しない場合（初めて出てきた場合）→0を代入（デフォルト値）
  // +1でproduct_idの出現回数を1増やす
  // accumulator[item.product_id]=(accumulator[item.product_id] || 0)+1;でproduct_idの出現回数を更新する
  const likeCounts = (data as { product_id: string }[]).reduce(
    (accumulator, item) => {
      // すでにカウントされている場合は +1、そうでなければ 1 に初期化
      accumulator[item.product_id] = (accumulator[item.product_id] || 0) + 1;
      return accumulator; // 更新された集計データを返す
    },
    {} as Record<string, number> // 初期値は空のオブジェクト(product_id をキー、そのカウント数を値とするオブジェクト)
  );

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
