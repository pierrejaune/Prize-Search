import { UserProvider } from '@/lib/userContext';
import type { Metadata } from 'next';
import './globals.css';
import { Noto_Sans } from 'next/font/google';
import { Header } from '@/components/Header';

const noto = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  preload: false,
  variable: '--font-noto-sans-jp',
  display: 'swap',
  fallback: ['Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Prize Search',
  description: 'ゲームセンター景品検索アプリ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <html lang='ja'>
        <body className={noto.variable}>
          <Header />
          <main className='container mx-auto p-4 original-navy'>
            {children}
          </main>
        </body>
      </html>
    </UserProvider>
  );
}
