import api from "./axios";

export const getReviews =
() =>
  api.get(
    "/reviews/admin"
  );

export const deleteReview =
(id:string) =>
  api.delete(
    `/reviews/${id}`
  );