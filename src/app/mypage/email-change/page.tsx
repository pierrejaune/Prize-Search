'use client';

import { useState } from 'react';
import { useUser } from '@/lib/userContext';
import { updateEmail } from '@/lib/supabase/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function EmailChangePage() {
  const { user } = useUser();
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailChange = async () => {
    const res = await updateEmail(newEmail);
    if (res.error) {
      setError(res.error);
    } else {
      router.push('/mypage');
    }
  };

  return (
    <div className='max-w-md mx-auto space-y-4'>
      <p>現在のメールアドレス: {user?.email}</p>
      <Input
        type='email'
        placeholder='新しいメールアドレス'
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      {error && <p className='text-red-500'>{error}</p>}
      <Button
        onClick={handleEmailChange}
        className='original-bg-navy original-white rounded-md'
      >
        変更
      </Button>
    </div>
  );
}
