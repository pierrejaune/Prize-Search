'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/lib/userContext';
import { updateProfile } from '@/lib/supabase/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const dynamic = 'auto';

export default function MyPage() {
  const { user, loading, refreshUser } = useUser();
  const [username, setUsername] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
    if (user?.avatar_url) {
      setAvatarUrl(`${user.avatar_url}?t=${Date.now()}`); // キャッシュ無効化
    }
  }, [user?.username, user?.avatar_url]);

  if (loading) return <p>ロード中...</p>;
  if (!user) return <p>ユーザー情報を取得できませんでした。</p>;

  const handleUpdate = async () => {
    setError('');
    setSuccess('');

    const res = await updateProfile({ username, avatarFile });

    if (res.error) {
      setError(res.error);
    } else {
      setSuccess('プロフィールを更新しました');
      await refreshUser();
    }
  };

  return (
    <Card className='max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>プロフィール</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center space-y-4'>
        <Avatar className='w-24 h-24'>
          <AvatarImage key={avatarUrl} src={avatarUrl || '/default.png'} />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>

        <div className='w-full'>
          <Label>ユーザー名</Label>
          <Input
            type='text'
            value={username}
            placeholder='ユーザー名を入力してください'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='w-full'>
          <Label>アバター画像</Label>
          <Input
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
          />
        </div>

        {error && <p className='text-red-500'>{error}</p>}
        {success && <p className='text-green-500'>{success}</p>}

        <Button onClick={handleUpdate}>更新</Button>
      </CardContent>
    </Card>
  );
}
