import api from "./axios";

export const getCart =
(token:string)=>
  api.get(
    "/cart",
    {
      headers:{
        Authorization:
        `Bearer ${token}`,
      },
    }
  );

export const addToCart =
(
  productId:string,
  quantity:number,
  size:string,
  color:string,
  token:string
)=>
  api.post(
    "/cart/add",
    {
      productId,
      quantity,
      size,
      color,
    },
    {
      headers:{
        Authorization:
        `Bearer ${token}`,
      },
    }
  );

export const updateCartItem =
(
  productId:string,
  quantity:number,
  size:string,
  color:string,
  token:string
)=>
  api.put(
    "/cart/update",
    {
      productId,
      quantity,
      size,
      color,
    },
    {
      headers:{
        Authorization:
        `Bearer ${token}`,
      },
    }
  );

export const removeFromCart =
(
  productId:string,
  size:string,
  color:string,
  token:string
)=>

  api.delete(
    "/cart/remove",
    {
      headers:{
        Authorization:
        `Bearer ${token}`,
      },

      data:{
        productId,
        size,
        color,
      },
    }
  );