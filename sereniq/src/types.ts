export type ProductCategory = 'skincare' | 'cleanser' | 'cream' | 'ampoule';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: ProductCategory;
  description: string;
  ingredients: string[];
  benefits: string[];
  howToUse: string;
  volume: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  rating: number;
  content: string;
  author: string;
  date: string;
  image?: string;
  avatar?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
