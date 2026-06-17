import {
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "@clerk/clerk-react";

import MainLayout
from "../layouts/MainLayout";

import {
  getMyOrders,
} from "../api/orderApi";

export default function OrdersPage() {

  const { getToken } =
  useAuth();

  const [orders,setOrders] =
  useState<any[]>([]);

  const [loading,setLoading] =
  useState(true);

  useEffect(()=>{

    const loadOrders =
    async()=>{

      try{

        const token =
        await getToken();

        if(!token) return;

        const res =
        await getMyOrders(
          token
        );

        setOrders(
          res.data.data
        );

      }
      catch(error){

        console.error(error);

      }
      finally{

        setLoading(false);

      }

    };

    loadOrders();

  },[]);

  return (

    <MainLayout>

      <div
        className="
        max-w-7xl
        mx-auto

        px-6
        py-12
        "
      >

        <h1
          className="
          text-4xl
          font-bold

          mb-10
          "
        >
          My Orders
        </h1>

        {loading ? (

          <div>
            Loading...
          </div>

        ) : orders.length === 0 ? (

          <div>
            No Orders Yet
          </div>

        ) : (

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
                  border

                  rounded-3xl

                  p-6
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

                      <p
                        className="
                        text-zinc-500
                        "
                      >
                        {
                          new Date(
                            order.createdAt
                          ).toLocaleDateString()
                        }
                      </p>

                    </div>

                    <span
                      className="
                      px-4
                      py-2

                      rounded-full

                      bg-zinc-100
                      "
                    >
                      {
                        order.orderStatus
                      }
                    </span>

                  </div>

                  {order.products.map(
                        (item:any)=>(
                            <div
                            key={item._id}
                            className="
                            flex
                            justify-between

                            py-2
                            "
                            >

                            <div>

                                <p
                                className="
                                font-medium
                                "
                                >
                                {item.product?.name}
                                </p>

                                <p
                                className="
                                text-sm
                                text-zinc-500
                                "
                                >
                                Size:
                                {" "}
                                {item.size || "-"}
                                </p>

                                <p
                                className="
                                text-sm
                                text-zinc-500
                                "
                                >
                                Color:
                                {" "}
                                {item.color || "-"}
                                </p>

                                <p
                                className="
                                text-sm
                                text-zinc-500
                                "
                                >
                                Qty:
                                {" "}
                                {item.quantity}
                                </p>

                            </div>

                            <span>
                                ₹
                                {
                                item.price *
                                item.quantity
                                }
                            </span>

                            </div>
                        )
                        )}

                  <div
                    className="
                    border-t

                    mt-4
                    pt-4

                    flex
                    justify-between

                    font-bold
                    "
                  >

                    <span>
                      Total
                    </span>

                    <span>
                      ₹
                      {
                        order.totalAmount
                      }
                    </span>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </MainLayout>

  );

}