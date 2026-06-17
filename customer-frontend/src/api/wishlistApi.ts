import api from "./axios";

export const getWishlist =
(token:string)=>
  api.get(
    "/wishlist",
    {
      headers:{
        Authorization:
        `Bearer ${token}`,
      },
    }
  );

export const addToWishlist =
(
  productId:string,
  token:string
)=>
  api.post(
    "/wishlist/add",
    { productId },
    {
      headers:{
        Authorization:
        `Bearer ${token}`,
      },
    }
  );

export const removeWishlist =
(
  productId:string,
  token:string
)=>
  api.delete(
    "/wishlist/remove",
    {
      headers:{
        Authorization:
        `Bearer ${token}`,
      },
      data:{
        productId,
      },
    }
  );