import api from "./axios";

export const getProducts =
(params:any)=>
api.get(
  "/products",
  {
    params
  }
);

  export const getProductBySlug =
(slug:string)=>
  api.get(
    `/products/slug/${slug}`
  );

  export const getRelatedProducts =
(categoryId:string)=>
  api.get(
    `/products?category=${categoryId}&limit=4`
  );

  export const searchProducts =
(search:string)=>
api.get(
  `/products?search=${search}`
);

export const getRecentOrders =
()=>
api.get(
"/orders/recent"
);

export const getFilterOptions = () =>
  api.get("/products/filters/options");