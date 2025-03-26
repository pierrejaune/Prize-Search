import { UserProvider } from '@/lib/userContext';
import type { Metadata } from 'next';
import './globals.css';
import { Noto_Sans } from 'next/font/google';
import { Header } from '@/components/Header';
// import LoadingWrapper from '@/components/LoadingWrapper';

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
  robots: 'noindex, nofollow',
  icons: {
    icon: '/favicon.ico', // ファビコン
    // apple: '/apple-touch-icon.png', // iOS用
  },
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
          {/* <LoadingWrapper> */}
          <Header />
          <main className='container mx-auto original-navy'>{children}</main>
          {/* </LoadingWrapper> */}
        </body>
      </html>
    </UserProvider>
  );
}
