'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [category, setCategory] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (manufacturer) params.set('manufacturer', manufacturer);
    if (category) params.set('category', category);
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className='bg-blue-500 text-white p-4 flex flex-col sm:flex-row items-center justify-between'>
      <h1 className='text-2xl font-bold'>
        <Link href='/'>Prize Search</Link>
      </h1>
      <div className='flex gap-2 mt-2 sm:mt-0'>
        <input
          type='text'
          placeholder='商品名で検索'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='p-2 text-black rounded'
        />
        <select
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          className='p-2 text-black rounded'
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
          className='p-2 text-black rounded'
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
    </header>
  );
}
