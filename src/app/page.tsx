import Link from 'next/link';
import { getProducts } from '@/lib/api';
import { Product } from '@/types';
import Image from 'next/image';

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

  // 期限切れの景品を非表示
  const filteredProducts = products.filter(
    (product) => !product.deadline || new Date(product.deadline) >= new Date()
  );

  return (
    <div className='p-6'>
      <h2 className='text-3xl font-bold my-4'>景品一覧</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className='p-4 border rounded shadow original-bg-white relative'
            >
              <Link href={`/${product.manufacture}/${product.product_code}`}>
                <Image
                  src={product.image_url}
                  width={333}
                  height={160}
                  alt={product.name}
                  className='mx-auto w-auto h-40 object-cover rounded duration-200 hover:scale-110'
                />
                <h3 className='text-xl font-semibold'>{product.name}</h3>
                <p className='text-sm'>{product.manufacture}</p>
                <p className='cursor-pointer text-2xl absolute right-4 bottom-4 z-10 hover:opacity-90'>
                  ❤️ {product.likes}
                </p>
              </Link>
            </div>
          ))
        ) : (
          <p>該当する商品がありません。</p>
        )}
      </div>
    </div>
  );
}
