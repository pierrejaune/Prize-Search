'use server';

import { Product, ProductDetailProps } from '@/types';
import { client } from '@/lib/microcms';
import { createClient } from '@/lib/supabase/server';

// ログインユーザーのいいねした商品を取得
export async function getLikedProducts(userId: string): Promise<Product[]> {
  const supabase = await createClient();

  // Supabase からユーザーがいいねした product_id を取得
  const { data: likedProducts, error } = await supabase
    .from('likes')
    .select('product_id')
    .eq('user_id', userId);

  if (error) {
    console.error('いいねした商品の取得に失敗しました:', error.message);
    return [];
  }

  const productIds = likedProducts.map((like) => like.product_id);

  if (productIds.length === 0) return [];

  // microCMS から該当する product_id の商品情報を取得
  const queries = {
    filters: productIds.map((id) => `id[equals]${id}`).join('[or]'),
  };

  try {
    const data = await client.get({ endpoint: 'products', queries });
    return data.contents as Product[];
  } catch (error) {
    console.error('microCMS からの商品取得に失敗しました', error);
    return [];
  }
}

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

export async function fetchProductDetail(
  manufacture: string,
  product_code: string
): Promise<ProductDetailProps | null> {
  try {
    // *エンコードしないと取得できない！
    const queries = {
      filters: `manufacture[equals]${decodeURI(
        manufacture
      )}[and]product_code[equals]${decodeURI(product_code)}`,
    };
    const data = await client.get({ endpoint: 'products', queries });
    // console.log(`デバッグ${data.contents[0].name}`);
    return data.contents.length > 0 ? data.contents[0] : null;
  } catch (error) {
    console.error('商品詳細の取得に失敗しました', error);
    return null;
  }
}
