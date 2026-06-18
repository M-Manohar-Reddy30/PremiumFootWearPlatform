import api from "./axios";

export const getFilterOptions = () =>
  api.get(
    "/products/filters/options"
  );