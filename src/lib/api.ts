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
    return data.contents as Product[];
  } catch (error) {
    console.error('データ取得に失敗しました', error);
    return [];
  }
}
