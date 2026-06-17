import api from "./axios";

export const getActiveBanners = () =>
  api.get("/banners/active");

export const getCategories = () =>
  api.get("/categories");

export const getFeaturedProducts = () =>
  api.get("/products?featured=true");

export const getTrendingProducts = () =>
  api.get("/products?trending=true");

export const getNewArrivalProducts = () =>
  api.get("/products?newArrival=true");

export const getSettings = () =>
  api.get("/settings");