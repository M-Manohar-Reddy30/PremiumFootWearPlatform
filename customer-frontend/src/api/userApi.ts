import api from "./axios";

export const syncUser = (data:any) =>
  api.post("/users/sync", data);

export const getProfile = (
  clerkId:string
) =>
  api.get(`/users/${clerkId}`);

export const updateProfile = (
  clerkId:string,
  data:any
) =>
  api.put(
    `/users/${clerkId}`,
    data
  );