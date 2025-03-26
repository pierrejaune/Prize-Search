import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'パスワードの変更 | マイページ | Prize Search',
  description: '現在のパスワードを新しいものに変更できます。',
};

export default function EmailChangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
