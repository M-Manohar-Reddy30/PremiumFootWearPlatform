export interface ProductFormData {
  name: string;

  description: string;

  price: number;

  discountPrice: number;

  category: string;

  sizes: string[];

  colors: string[];

  stock: number;

  featured: boolean;

  trending: boolean;

  newArrival: boolean;

  images: {
    url: string;
    publicId: string;
  }[];
}