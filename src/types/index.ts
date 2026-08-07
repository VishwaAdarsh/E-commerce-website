export type ProductStatus = 'ACTIVE' | 'LOW STOCK' | 'DRAFT' | 'ARCHIVED';

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo_url?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text?: string;
  display_order?: number;
}

export interface ProductVariantItem {
  id: string;
  product_id: string;
  title: string;
  sku: string;
  price: number;
  stock: number;
  options?: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  title?: string;
  sku: string;
  category: string;
  category_id?: string;
  price: number;
  originalPrice?: number;
  compare_at_price?: number;
  stock: number;
  status: ProductStatus;
  rating: number;
  isNew?: boolean;
  isBestseller?: boolean;
  image: string;
  images?: ProductImage[];
  variants_list?: ProductVariantItem[];
  description: string;
  specifications?: Record<string, string>;
  created_at?: string;
}

export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  avatarInitials: string;
  date: string;
  amount: number;
  status: OrderStatus;
  items: OrderItem[];
}

export interface CartItem {
  id: string;
  product: Product;
  variant: string;
  quantity: number;
}

export interface InventoryAlert {
  id: string;
  title: string;
  status: string;
  type: 'danger' | 'warning';
  image: string;
}
