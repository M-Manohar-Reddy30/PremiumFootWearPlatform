import api from "./axios";

export const getSettings = () =>
  api.get("/settings");

export const updateSettings = (
  data: any
) =>
  api.put(
    "/settings",
    data
  );