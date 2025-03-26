'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const signupSchema = z.object({
  email: z.string().email('無効なメールアドレスです'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
});

export async function signupUser(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email');
  const password = formData.get('password');

  const parsedData = signupSchema.safeParse({ email, password });
  if (!parsedData.success) {
    return { error: parsedData.error.errors[0].message };
  }

  const { data, error } = await supabase.auth.signUp({
    email: parsedData.data.email,
    password: parsedData.data.password,
  });

  if (error) return { error: error.message };
  if (!data.user) return { error: 'ユーザー情報が取得できませんでした。' };

  return { message: '登録が成功しました！確認メールを確認してください。' };
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message };

  return { message: 'ログインに成功しました！' };
}

//* 修正: `logout` 関数を削除（代わりに `LogoutButton.tsx` を使用）
