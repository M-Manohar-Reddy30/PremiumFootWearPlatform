import authenticatedApi
from "./authenticatedApi";

export const getProductReviews =
(productId:string)=>
  authenticatedApi.get(
    `/reviews/product/${productId}`
  );

export const createReview =
(
  data:any,
  token:string
)=>
  authenticatedApi.post(

    "/reviews",

    data,

    {
      headers:{
        Authorization:
        `Bearer ${token}`,
      },
    }

  );

export const markReviewHelpful =
(id:string)=>
  authenticatedApi.post(
    `/reviews/${id}/helpful`
  );