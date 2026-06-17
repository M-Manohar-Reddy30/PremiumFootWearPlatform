import api from "./axios";

export const getBanners = () =>
  api.get("/banners");

export const createBanner = (
  data: any
) =>
  api.post(
    "/banners",
    data
  );

export const updateBanner = (
  id: string,
  data: any
) =>
  api.put(
    `/banners/${id}`,
    data
  );

export const deleteBanner = (
  id: string
) =>
  api.delete(
    `/banners/${id}`
  );