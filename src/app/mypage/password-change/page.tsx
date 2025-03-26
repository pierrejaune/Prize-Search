'use client';

import { useState } from 'react';
import { updatePassword } from '@/lib/supabase/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PasswordChangePage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handlePasswordChange = async () => {
    const res = await updatePassword(currentPassword, newPassword);
    if (res.error) {
      setError(res.error);
    } else {
      router.push('/mypage');
    }
  };

  return (
    <div className='max-w-md mx-auto space-y-4 p-4'>
      <h2 className='text-xl font-bold mb-4'>パスワードの変更</h2>
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder='現在のパスワード'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-2 top-2'
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>
      <div className='relative'>
        <Input
          type={showNewPassword ? 'text' : 'password'}
          placeholder='新しいパスワード'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          type='button'
          onClick={() => setShowNewPassword(!showNewPassword)}
          className='absolute right-2 top-2'
        >
          {showNewPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
      <Button
        onClick={handlePasswordChange}
        className='original-bg-navy original-white rounded-md mt-2'
      >
        変更
      </Button>
    </div>
  );
}
