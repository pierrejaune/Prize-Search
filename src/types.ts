export type Product = {
  id: string;
  name: string;
  manufacture: string;
  product_code: string;
  image_url: string;
  likes: number;
  deadline?: string; // 期限日（YYYY-MM-DD 形式）
};
