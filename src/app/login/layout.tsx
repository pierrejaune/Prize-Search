import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ログインページ | Prize Search',
  description: 'ログインページです。',
};

export default function EmailChangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
