import api from "./axios";

export const placeOrder =
(token:string)=>

api.post(
  "/orders/place",
  {},
  {
    headers:{
      Authorization:
      `Bearer ${token}`,
    },
  }
);

export const getMyOrders =
(token:string)=>

api.get(
  "/orders/my-orders",
  {
    headers:{
      Authorization:
      `Bearer ${token}`,
    },
  }
);

export const getRecentOrders =
()=>

api.get(
  "/orders/recent"
);