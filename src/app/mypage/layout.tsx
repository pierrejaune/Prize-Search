import Sidebar from '@/components/mypage/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'マイページ',
  description: 'ゲームセンター景品検索アプリ',
  robots: 'noindex, nofollow',
};

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen justify-between'>
      <Sidebar />
      <main className='w-3/4 p-6'>{children}</main>
    </div>
  );
}
