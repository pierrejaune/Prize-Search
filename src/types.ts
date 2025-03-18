export type Product = {
  id: string;
  name: string;
  manufacture: string;
  product_code: string;
  image_url: string;
  likes: number;
  deadline?: string; // 期限日（YYYY-MM-DD 形式）
};

export type shops = {
  id: string;
  name: string;
  shop_url: string;
};

export interface ProductDetail extends Product {
  description: string;
  deadline: string;
  shops: shops[];
}
