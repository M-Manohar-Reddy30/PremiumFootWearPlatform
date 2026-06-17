import api from "./axios";

export const getOrders =
()=>
api.get(
  "/orders/admin"
);

export const updateOrderStatus =
(
  id:string,
  orderStatus:string
)=>
api.put(
  `/orders/${id}/status`,
  {
    orderStatus,
  }
);