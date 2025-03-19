'use server';

import { createClient } from '@/lib/supabase/server';

export async function updateProfile({
  username,
  avatarUrl,
}: {
  username: string;
  avatarUrl: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return { error: 'ユーザーが見つかりません' };

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ username, avatar_url: avatarUrl })
    .eq('id', data.user.id);

  return { error: updateError ? updateError.message : null };
}
