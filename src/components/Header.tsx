'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/lib/userContext';
import { LogoutButton } from './_auth/LogoutButton';
import { X, Search } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [isHome, setIsHome] = useState(true);
  const { user } = useUser();
  const [searchOpen, setSearchOpen] = useState(false);

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
    setSearchOpen(false);
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className='original-bg-yellow text-white p-4 flex items-center justify-between'>
      <h1 className='text-[4vw] sm:text-2xl font-bold'>
        <Link href='/'>Prize Search</Link>
      </h1>

      {/* スマホ・タブレット用 🔍 アイコン */}
      <div className='flex lg:hidden items-center gap-4 text-sm'>
        {isHome && (
          <div className='bg-white w-12 h-12 rounded-full fixed bottom-4 right-4 z-10'>
            <button
              onClick={() => setSearchOpen(true)}
              className='original-navy absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'
            >
              <Search size={28} />
            </button>
          </div>
        )}

        {!user ? (
          <>
            <Link href='/signup' className='original-bg-navy px-4 py-2 rounded'>
              サインアップ
            </Link>
            <Link href='/login' className='bg-blue-500 px-4 py-2 rounded'>
              ログイン
            </Link>
          </>
        ) : (
          <>
            <LogoutButton />
            <Link
              href='/mypage'
              className='original-bg-orange px-4 py-2 rounded'
            >
              マイページ
            </Link>
          </>
        )}
      </div>

      {/* PC・タブレット用の検索 + ログインボタン */}
      <div className='hidden lg:flex flex-1 justify-end items-center gap-4 text-md'>
        {isHome && (
          <div className='flex gap-2'>
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

        {user ? (
          <>
            <LogoutButton />
            <Link
              href='/mypage'
              className='original-bg-orange px-4 py-2 rounded'
            >
              マイページ
            </Link>
          </>
        ) : (
          <>
            <Link href='/signup' className='original-bg-navy px-4 py-2 rounded'>
              サインアップ
            </Link>
            <Link href='/login' className='bg-blue-500 px-4 py-2 rounded'>
              ログイン
            </Link>
          </>
        )}
      </div>

      {/* 🔍 で表示される全画面検索 */}
      {searchOpen && (
        <div className='fixed inset-0 original-navy original-bg-white z-50 flex flex-col items-center justify-center p-6'>
          <button
            onClick={() => setSearchOpen(false)}
            className='absolute top-8 right-8'
          >
            <X size={32} />
          </button>
          <div className='w-full max-w-md flex flex-col gap-4'>
            <input
              type='text'
              placeholder='商品名で検索'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='p-3 border rounded w-full'
            />
            <select
              value={manufacture}
              onChange={(e) => setManufacture(e.target.value)}
              className='p-3 border rounded w-full'
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
              className='p-3 border rounded w-full'
            >
              <option value=''>カテゴリを選択</option>
              <option value='ぬいぐるみ'>ぬいぐるみ</option>
              <option value='おもちゃ'>おもちゃ</option>
              <option value='お菓子'>お菓子</option>
            </select>
            <button
              onClick={handleSearch}
              className='bg-blue-500 text-white px-4 py-3 rounded w-full'
            >
              検索
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
