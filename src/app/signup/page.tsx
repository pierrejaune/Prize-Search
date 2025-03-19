'use client';

import { useState } from 'react';
import { signupUser } from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signupUser(formData);

    if (result?.error) {
      setError(result.error);
    }

    if (result?.message) {
      setMessage(
        'メールアドレスに確認用のメッセージを送りましたので、確認用リンクをクリックしてユーザー情報を確定してください'
      );
    }
  }

  return (
    <div className='max-w-md mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>サインアップ</h1>
      {error && <p className='text-red-500'>{error}</p>}
      {message && <p className='text-green-500'>{message}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input
          name='email'
          type='email'
          placeholder='メールアドレス'
          required
        />
        <div className='relative'>
          <Input
            name='password'
            type={passwordVisible ? 'text' : 'password'}
            placeholder='パスワード'
            required
          />
          <button
            type='button'
            onClick={() => setPasswordVisible(!passwordVisible)}
            className='absolute right-2 top-2'
          >
            {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <Button type='submit'>登録</Button>
      </form>
    </div>
  );
}
