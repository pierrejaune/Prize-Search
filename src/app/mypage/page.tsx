'use client';

import { useUser } from '@/lib/userContext';
import { Button } from '@/components/ui/button';
import { logout } from '@/lib/auth';

export default function MyPage() {
  const { user, loading } = useUser();

  if (loading) {
    return <p>ロード中...</p>;
  }

  return (
    <div className='flex'>
      {/* サイドバー */}
      <aside className='w-1/4 p-4 bg-gray-200 min-h-screen'>
        <h2 className='text-xl font-bold mb-4'>マイページ</h2>
        <ul>
          <li className='mb-2'>
            <a href='/mypage'>プロフィール</a>
          </li>
          <li className='mb-2'>
            <a href='/mypage/email-change'>メール変更</a>
          </li>
          <li className='mb-2'>
            <a href='/mypage/password-change'>パスワード変更</a>
          </li>
        </ul>
      </aside>

      {/* メインコンテンツ */}
      <div className='w-3/4 p-4'>
        <h1 className='text-2xl font-bold mb-4'>プロフィール</h1>
        {user ? (
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium'>アバター</label>
              <img
                src={user.avatar_url || '/default-avatar.png'}
                alt='Avatar'
                className='w-20 h-20 rounded-full'
              />
            </div>
            <div>
              <label className='block text-sm font-medium'>ユーザー名</label>
              <p>{user.username}</p>
            </div>
            <div>
              <label className='block text-sm font-medium'>
                メールアドレス
              </label>
              <p>{user?.email ?? 'メールアドレスなし'}</p>
            </div>
            <Button onClick={logout}>ログアウト</Button>
          </div>
        ) : (
          <p>ユーザー情報を取得できませんでした。</p>
        )}
      </div>
    </div>
  );
}
