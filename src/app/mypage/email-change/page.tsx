'use client';

import { useState } from 'react';
import { updateEmail } from '@/lib/supabase/actions';
import { useUser } from '@/lib/userContext';
import { useRouter } from 'next/navigation';

export const dynamic = 'auto';

export default function EmailChangePage() {
  const { user } = useUser();
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailChange = async () => {
    setMessage('');
    setError('');

    if (!newEmail) {
      setError('新しいメールアドレスを入力してください。');
      return;
    }

    const result = await updateEmail(newEmail);
    if (result.error) {
      setError(result.error);
    } else {
      setMessage(result.message ?? '確認メールを送信しました。');

      // 5秒後に /mypage へリダイレクト
      setTimeout(() => {
        router.push('/mypage');
      }, 5000);
    }
  };

  return (
    <div className='max-w-md mx-auto p-4'>
      <h1 className='text-xl font-bold mb-4'>メールアドレスの変更</h1>
      <p className='mb-2'>現在のメールアドレス: {user?.email}</p>
      <input
        type='email'
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        className='w-full p-2 border rounded mb-2'
        placeholder='新しいメールアドレス'
      />
      <button
        onClick={handleEmailChange}
        className='w-full bg-blue-500 text-white p-2 rounded'
      >
        変更リクエストを送信
      </button>

      {message && <p className='text-green-500 mt-2'>{message}</p>}
      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </div>
  );
}
