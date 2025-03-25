import Link from 'next/link';
import Image from 'next/image';
import { getLikedProducts } from '@/lib/api';
import { getLikesCount } from '@/lib/supabase/actions';
import { createClient } from '@/lib/supabase/server';
import LikeButton from '@/components/LikeButton';

export default async function LikesPage() {
  const supabase = await createClient();
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData?.session?.user?.id;

  if (!userId) {
    return <p className='p-6'>ログインが必要です。</p>;
  }

  const products = await getLikedProducts(userId);
  const likesCount = await getLikesCount();

  return (
    <div className='p-6'>
      <h2 className='text-3xl font-bold my-4'>お気に入り一覧</h2>
      {products.length > 0 ? (
        <ul className='space-y-4'>
          {products.map((product) => (
            <li
              key={product.id}
              className='p-4 border rounded shadow relative flex'
            >
              <Link
                href={`/${product.manufacture}/${product.product_code}`}
                className='flex w-full'
              >
                <Image
                  src={product.image_url}
                  width={300}
                  height={200}
                  alt={product.name}
                  className='w-1/3 object-cover rounded'
                />
                <div className='ml-4 flex flex-col justify-center'>
                  <h3 className='text-xl font-semibold'>{product.name}</h3>
                  <p className='text-sm text-gray-600'>{product.manufacture}</p>
                </div>
              </Link>
              <div className='absolute bottom-4 right-4'>
                <LikeButton
                  productId={product.id}
                  initialLikesCount={likesCount[product.id] ?? 0}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>いいねした商品がありません。</p>
      )}
    </div>
  );
}
