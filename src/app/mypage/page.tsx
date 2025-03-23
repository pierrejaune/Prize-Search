'use client';

import { useEffect } from 'react';
import { useUser } from '@/lib/userContext';
import Link from 'next/link';
import Image from 'next/image';
import { LogoutButton } from '@/components/_auth/LogoutButton';

export default function MyPage() {
  const { user, loading } = useUser();

  useEffect(() => {
    console.log('[MyPage] user:', user);
    console.log('[MyPage] loading:', loading);
  }, [user, loading]);

  if (loading) {
    return <p>ロード中...</p>;
  }

  if (!user) {
    return <p>ユーザー情報を取得できませんでした。</p>;
  }

  return (
    <div className='flex'>
      {/* サイドバー */}
      <aside className='w-1/4 p-4 bg-gray-200 min-h-screen'>
        <h2 className='text-xl font-bold mb-4'>マイページ</h2>
        <ul>
          <li className='mb-2'>
            <Link href='/mypage'>プロフィール</Link>
          </li>
          <li className='mb-2'>
            <Link href='/mypage/email-change'>メール変更</Link>
          </li>
          <li className='mb-2'>
            <Link href='/mypage/password-change'>パスワード変更</Link>
          </li>
        </ul>
      </aside>

      {/* メインコンテンツ */}
      <div className='w-3/4 p-4'>
        <h1 className='text-2xl font-bold mb-4'>プロフィール</h1>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium'>アバター</label>
            <Image
              src={user.avatar_url || '/default.png'}
              alt='Avatar'
              width={80}
              height={80}
              className='w-20 h-20 rounded-full'
            />
          </div>
          <div>
            <label className='block text-sm font-medium'>ユーザー名</label>
            <p>{user.username}</p>
          </div>
          <div>
            <label className='block text-sm font-medium'>メールアドレス</label>
            <p>{user.email ?? 'メールアドレスなし'}</p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
