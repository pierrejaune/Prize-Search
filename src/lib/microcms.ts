import { createClient } from 'microcms-js-sdk';

// サーバーサイドでのみ実行することを明示
if (typeof window !== 'undefined') {
  throw new Error(
    'microCMS クライアントはサーバーサイドでのみ実行してください'
  );
}

// 環境変数のチェック
if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
  console.error(
    'MICROCMS_SERVICE_DOMAIN または MICROCMS_API_KEY が設定されていません'
  );
  throw new Error(
    'MICROCMS_SERVICE_DOMAIN または MICROCMS_API_KEY が設定されていません'
  );
}

// microCMS クライアントを作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});
