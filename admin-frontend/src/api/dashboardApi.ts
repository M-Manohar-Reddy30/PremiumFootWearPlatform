import api from "./axios";

export const getDashboardStats =
() =>
api.get("/dashboard/stats");

export const getOrderAnalytics =
() =>
api.get("/dashboard/orders");

export const getProductAnalytics =
() =>
api.get("/dashboard/products");