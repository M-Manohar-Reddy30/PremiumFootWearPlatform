import api from "./axios";

export const getProducts = (params?: any) =>
  api.get("/products", { params });

export const getProduct = (id: string) =>
  api.get(`/products/${id}`);

export const createProduct = (data: any) =>
  api.post("/products", data);

export const updateProduct = (
  id: string,
  data: any
) =>
  api.put(`/products/${id}`, data);

export const deleteProduct = (
  id: string
) =>
  api.delete(`/products/${id}`);