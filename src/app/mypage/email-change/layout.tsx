import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'メールアドレスの変更 | マイページ | Prize Search',
  description: '現在のメールアドレスを新しいものに変更できます。',
};

export default function EmailChangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
