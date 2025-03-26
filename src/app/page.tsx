import Link from 'next/link';
import { getProducts } from '@/lib/api';
import { getLikesCount } from '@/lib/supabase/actions';
import { Product } from '@/types';
import Image from 'next/image';
import LikeButton from '@/components/LikeButton';

export const dynamic = 'auto';

type searchParams = {
  q?: string;
  manufacture?: string;
  category?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<searchParams>;
}) {
  // *修正参考リンク：https://nextjs.org/docs/messages/sync-dynamic-apis
  const params = await searchParams; // searchParams を await する
  const query = params?.q ?? '';
  const manufacture = params?.manufacture ?? '';
  const category = params?.category ?? '';

  const products: Product[] = await getProducts(query, manufacture, category);
  const likesCount = await getLikesCount();
  // console.log(`productId2:${products[2].id}`);
  // console.log(`likesCount:${likesCount[products[2].id]}`);
  // 期限切れの景品を非表示
  const filteredProducts = products.filter(
    (product) => !product.deadline || new Date(product.deadline) >= new Date()
  );

  return (
    <div className='p-6 max-w-[1200px] mx-auto'>
      <h2 className='text-2xl font-bold my-4'>景品一覧</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className='p-4 border rounded shadow original-bg-white relative'
            >
              <Link
                href={`/${product.manufacture}/${product.product_code}`}
                className='h-full flex flex-col'
              >
                <Image
                  src={product.image_url}
                  width={333}
                  height={80}
                  alt={product.name}
                  className='mx-auto w-auto h-auto object-cover rounded duration-200 hover:scale-110 items-center my-auto'
                />
                <div className='mt-auto pt-4'>
                  <h3 className='text-xl font-semibold'>{product.name}</h3>
                  <p className='text-sm'>{product.manufacture}</p>
                </div>
              </Link>
              <div className='absolute right-4 bottom-4'>
                <LikeButton
                  productId={product.id}
                  initialLikesCount={likesCount[product.id] ?? 0}
                />
              </div>
            </div>
          ))
        ) : (
          <p>該当する商品がありません。</p>
        )}
      </div>
    </div>
  );
}
