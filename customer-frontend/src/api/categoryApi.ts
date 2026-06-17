import api from "./axios";

export const getCategoryProducts =
(slug:string)=>

api.get(
  `/products/category/${slug}`
);