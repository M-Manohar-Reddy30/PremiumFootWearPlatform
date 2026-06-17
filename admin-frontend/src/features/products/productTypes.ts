export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface ProductImage {
  _id?: string;
  url: string;
  publicId: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;

  price: number;
  discountPrice: number;

  category: Category;

  sizes: string[];
  colors: string[];

  stock: number;

  featured: boolean;
  trending: boolean;
  newArrival: boolean;

  images: ProductImage[];

  averageRating: number;
  reviewCount: number;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}