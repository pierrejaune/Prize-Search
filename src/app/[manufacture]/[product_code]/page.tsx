import { fetchProductDetail } from '@/lib/api';
import { getLikesCount } from '@/lib/supabase/actions';
import { ProductDetailProps, Shops } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import LikeButton from '@/components/LikeButton';

export const dynamic = 'auto';
interface DetailUrlParams {
  params: Promise<{ manufacture: string; product_code: string }>;
}

// 🔽 メタデータを動的に設定
export async function generateMetadata({ params }: DetailUrlParams) {
  // 修正参考：https://zenn.dev/ojin/articles/9ba0f4f50994a7
  const urlParams = await params;
  const { manufacture, product_code } = urlParams;
  const product: ProductDetailProps | null = await fetchProductDetail(
    manufacture,
    product_code
  );

  if (!product) {
    return {
      title: '商品が見つかりません',
      description: '指定された商品が見つかりませんでした。',
    };
  }

  return {
    title: `${product.name} | Prize Search`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image_url }],
    },
  };
}

export default async function ProductDetail({ params }: DetailUrlParams) {
  // 修正参考：https://zenn.dev/ojin/articles/9ba0f4f50994a7
  const urlParams = await params;
  const { manufacture, product_code } = urlParams;
  const product: ProductDetailProps | null = await fetchProductDetail(
    manufacture,
    product_code
  );

  if (!product) {
    return <p className='text-center mt-10'>商品が見つかりません。</p>;
  }

  // いいね数を取得
  const likesCount = await getLikesCount();

  // 期限日を "MM月dd日" の形式に変換
  const formattedDeadline = product.deadline
    ? `${format(new Date(product.deadline), 'M月d日', { locale: ja })}まで`
    : 'なし';

  return (
    <div className='max-w-90 mx-auto p-6 mt-4'>
      <h1 className='text-3xl font-bold text-left mb-4 original-orange'>
        景品名：{product.name}
      </h1>
      <div className='flex flex-col md:flex-row items-center gap-4'>
        <Image
          src={product.image_url}
          alt={product.name}
          width={680}
          height={778}
          className='w-50 h-auto rounded'
        />
        <div className='text-md w-50 flex flex-col gap-6 original-navy'>
          <div className='mt-4 flex items-center gap-2'>
            <LikeButton
              productId={product.id}
              initialLikesCount={likesCount[product.id] ?? 0}
            />
          </div>
          <p>
            <span className='font-bold pb-2'>景品詳細</span>
            <br />
            {product.description}
          </p>
          <p>
            <span className='font-bold pb-2'>メーカー名</span>
            <br />
            {product.manufacture}
          </p>
          <p>
            下記ゲームセンターにあるのは
            <span className='font-bold'>{formattedDeadline}</span>
          </p>
          <div className='mt-4'>
            <h2 className='text-lg font-bold pb-2'>取り扱い店舗</h2>
            <ul className='list-disc list-inside'>
              {product.shops.map((shop: Shops) => (
                <li key={shop.id} className='pb-1 list-none'>
                  <Link
                    href={shop.shop_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 hover:underline'
                  >
                    {shop.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
