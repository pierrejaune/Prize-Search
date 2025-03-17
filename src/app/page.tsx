import Link from 'next/link';
import { getProducts } from '@/lib/api';
import { Product } from '@/types';

export default async function Home({
  searchParams,
}: {
  searchParams?: { q?: string; manufacturer?: string; category?: string };
}) {
  const query = searchParams?.q ?? '';
  const manufacturer = searchParams?.manufacturer ?? '';
  const category = searchParams?.category ?? '';

  const products: Product[] = await getProducts(query, manufacturer, category);

  return (
    <div>
      <h2 className='text-3xl font-bold my-4'>景品一覧</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className='p-4 border rounded shadow'>
              <Link
                href={`/${product.manufacture}/${product.product_code}`}
                className='text-gray-600 hover:opacity-70'
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className='w-full h-40 object-cover rounded'
                />
                <h3 className='text-xl font-semibold'>{product.name}</h3>
                <p className='text-sm text-gray-600'>{product.manufacture}</p>
                <p className='cursor-pointer'>👍 {product.likes}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className='text-gray-500'>該当する商品がありません。</p>
        )}
      </div>
    </div>
  );
}
