import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className='xl:w-1/4 lg:w-1/2 sm:w-full p-4 lg:p-6 original-bg-white original-navy h-100 border-r'>
      <h2 className='font-bold mb-4 sm:text-base md:text-xl'>マイページ</h2>
      <ul className='text-xs md:text-base grid sm:grid-cols-2 lg:grid-cols-1'>
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
        <li>
          <Link
            href='/mypage/likes'
            className='block px-4 py-2 rounded-lg hover:bg-gray-200'
          >
            お気に入り一覧
          </Link>
        </li>
      </ul>
    </aside>
  );
}
