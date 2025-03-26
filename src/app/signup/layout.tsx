import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '新規会員登録ページ | Prize Search',
  description: '新規会員登録ページです。',
};

export default function EmailChangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
