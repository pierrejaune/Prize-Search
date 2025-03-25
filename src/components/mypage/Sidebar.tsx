import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className='w-1/4 p-6 original-bg-white original-navy h-100 border-r'>
      <h2 className='text-xl font-bold mb-4'>マイページ</h2>
      <ul className='space-y-2'>
        <li>
          <Link
            href='/mypage/'
            className='block px-4 py-2 rounded-lg hover:bg-gray-200'
          >
            プロフィール
          </Link>
        </li>
        <li>
          <Link
            href='/mypage/email-change'
            className='block px-4 py-2 rounded-lg hover:bg-gray-200'
          >
            メール変更
          </Link>
        </li>
        <li>
          <Link
            href='/mypage/password-change'
            className='block px-4 py-2 rounded-lg hover:bg-gray-200'
          >
            パスワード変更
          </Link>
        </li>
      </ul>
    </aside>
  );
}
