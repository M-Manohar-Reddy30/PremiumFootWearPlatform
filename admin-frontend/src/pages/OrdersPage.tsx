import {
  useEffect,
  useState,
} from "react";

import {
  getOrders,
  updateOrderStatus,
} from "../api/orderApi";

export default function OrdersPage() {

  const [orders,setOrders] =
  useState<any[]>([]);

  const loadOrders =
  async()=>{

    try{

      const res =
      await getOrders();

      setOrders(
        res.data.data
      );

    }
    catch(error){

      console.error(error);

    }

  };

  useEffect(()=>{

    loadOrders();

  },[]);

  const handleStatus =
  async(
    orderId:string,
    status:string
  )=>{

    try{

      await updateOrderStatus(
        orderId,
        status
      );

      loadOrders();

    }
    catch(error){

      console.error(error);

    }

  };

  return (

    <div>

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        Orders
      </h1>

      <div
        className="
        space-y-6
        "
      >

        {orders.map(
          (order:any)=>(

            <div
              key={order._id}
              className="
              bg-white

              p-6

              rounded-xl

              shadow
              "
            >

              <div
                className="
                flex
                justify-between
                mb-4
                "
              >

                <div>

                  <h3
                    className="
                    font-semibold
                    "
                  >
                    Order #
                    {
                      order._id.slice(-6)
                    }
                  </h3>

                  <p>
                    {
                      order.user?.fullName
                    }
                  </p>

                  <p>
                    {
                      order.user?.email
                    }
                  </p>

                </div>

                <div>

                  <select

                    value={
                      order.orderStatus
                    }

                    onChange={(e)=>
                      handleStatus(
                        order._id,
                        e.target.value
                      )
                    }

                    className="
                    border
                    p-2
                    rounded
                    "
                  >

                    <option value="pending">
                      Pending
                    </option>

                    <option value="confirmed">
                      Confirmed
                    </option>

                    <option value="shipped">
                      Shipped
                    </option>

                    <option value="delivered">
                      Delivered
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>

                  </select>

                </div>

              </div>

              <div
                className="
                space-y-3
                "
              >

                {order.products.map(
                  (item:any)=>(

                    <div
                      key={
                        item._id
                      }

                      className="
                      border-t
                      pt-3
                      "
                    >

                      <p
                        className="
                        font-medium
                        "
                      >
                        {
                          item.product?.name
                        }
                      </p>

                      <p>
                        Size:
                        {" "}
                        {
                          item.size || "-"
                        }
                      </p>

                      <p>
                        Color:
                        {" "}
                        {
                          item.color || "-"
                        }
                      </p>

                      <p>
                        Qty:
                        {" "}
                        {
                          item.quantity
                        }
                      </p>

                      <p>
                        ₹
                        {
                          item.price
                        }
                      </p>

                    </div>

                  )
                )}

              </div>

              <div
                className="
                mt-4

                font-bold

                text-right
                "
              >

                Total:
                {" "}
                ₹
                {
                  order.totalAmount
                }

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

}