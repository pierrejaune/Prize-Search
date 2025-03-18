'use server';

import { Product } from '@/types';
import { client } from '@/lib/microcms';

export async function getProducts(
  q?: string,
  manufacturer?: string,
  category?: string
): Promise<Product[]> {
  try {
    const queries: Record<string, string | undefined> = { limit: '20' };

    if (q) queries.q = q;
    if (manufacturer || category) {
      queries.filters = [
        manufacturer ? `manufacture[equals]${manufacturer}` : '',
        category ? `category[equals]${category}` : '',
      ]
        .filter(Boolean)
        .join('[and]');
    }

    const data = await client.get({ endpoint: 'products', queries });
    // console.log(data);
    return data.contents.map((product: Product) => ({
      ...product,
      deadline: product.deadline || null, // 期限がない場合は `null`
    })) as Product[];
  } catch (error) {
    console.error('データ取得に失敗しました', error);
    return [];
  }
}
