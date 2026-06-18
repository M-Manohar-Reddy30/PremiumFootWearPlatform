import api from "./axios";

export const getCategoryProducts =
(slug:string)=>

api.get(
  `/products/category/${slug}`
);

export const getFilterOptions =
()=>

api.get(
  "/products/filters/options"
);