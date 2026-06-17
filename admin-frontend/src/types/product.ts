export interface Product {
  _id: string;

  name: string;

  slug: string;

  description: string;

  price: number;

  discountPrice: number;

  stock: number;

  featured: boolean;

  trending: boolean;

  newArrival: boolean;

  images: {
    url: string;
    publicId: string;
  }[];

  category: any;
}