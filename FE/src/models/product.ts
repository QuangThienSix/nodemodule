export interface Product {
  id: string | number;
  name: string;
  is_deleted: boolean;
  cateted_at: string;
  updated_at: string;
  ratting: number;
  time_start: string;
  time_end: string;
  price: number;
  brand_id: string | number;
  brand_name: string;
  category_id: string | number;
  category_name: string;
  timestamp: string;
  avatar: string;
  images: string;
  current_price: number;
  max_price: number;
  count_quantity_bidder: number;
  seller_id: string | number;
  description: string;
  step: number;
  is_automatic: number;
}
