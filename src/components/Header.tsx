'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/lib/userContext';
import { LogoutButton } from './_auth/LogoutButton';

export function Header() {
  const pathname = usePathname();
  const [isHome, setIsHome] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    setIsHome(pathname === '/');
  }, [pathname]);

  const [searchTerm, setSearchTerm] = useState('');
  const [manufacture, setManufacture] = useState('');
  const [category, setCategory] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (manufacture) params.set('manufacture', manufacture);
    if (category) params.set('category', category);
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className='original-bg-yellow text-white p-4 flex flex-col sm:flex-row items-center justify-between'>
      <h1 className='text-3xl font-bold'>
        <Link href='/'>Prize Search</Link>
      </h1>
      <div className='flex gap-2 mt-2 sm:mt-0'>
        {/* トップページ以外では検索ボックスを非表示 */}
        {isHome && (
          <div className='header-box flex gap-2 mt-2 sm:mt-0'>
            <input
              type='text'
              placeholder='商品名で検索'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='p-2 original-navy rounded'
            />
            <select
              value={manufacture}
              onChange={(e) => setManufacture(e.target.value)}
              className='p-2 original-navy rounded'
            >
              <option value=''>メーカーを選択</option>
              <option value='メーカーA'>メーカーA</option>
              <option value='メーカーB'>メーカーB</option>
              <option value='メーカーC'>メーカーC</option>
              <option value='メーカーD'>メーカーD</option>
              <option value='メーカーE'>メーカーE</option>
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='p-2 original-navy rounded'
            >
              <option value=''>カテゴリを選択</option>
              <option value='ぬいぐるみ'>ぬいぐるみ</option>
              <option value='おもちゃ'>おもちゃ</option>
              <option value='お菓子'>お菓子</option>
            </select>
            <button
              onClick={handleSearch}
              className='bg-white text-blue-500 px-4 py-2 rounded'
            >
              検索
            </button>
          </div>
        )}

        {/* ログイン・ログアウトボタンを追加 */}
        {user ? (
          <>
            <LogoutButton />
            <Link
              href='/mypage'
              className='original-bg-orange px-4 py-2 rounded hover:opacity-70'
            >
              マイページ
            </Link>
          </>
        ) : (
          <>
            <Link
              href='/signup'
              className='original-bg-navy px-4 py-2 rounded hover:opacity-70'
            >
              サインアップ
            </Link>
            <Link
              href='/login'
              className='bg-blue-500 px-4 py-2 rounded hover:opacity-70'
            >
              ログイン
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
