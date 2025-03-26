import Sidebar from '@/components/mypage/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'マイページ | プロフィール | Prize Search',
  description: 'プロフィール更新ページ',
  robots: 'noindex, nofollow',
};

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='lg:flex min-h-screen lg:justify-between'>
      <Sidebar />
      <main className='lg:w-3/4 p-6 sm:w-full'>{children}</main>
    </div>
  );
}
