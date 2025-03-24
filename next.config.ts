import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // runtime: 'edge', // ✅ Edge Runtime を明示的に指定
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blogger.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
