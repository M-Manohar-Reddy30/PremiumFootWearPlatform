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

import {
  Package,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";

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
          res.data.data || []
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

  const getStatusColor =
  (status:string)=>{

    switch(status){

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      default:
        return "bg-zinc-100 text-zinc-700";

    }

  };

  const getStatusIcon =
  (status:string)=>{

    switch(status){

      case "pending":
        return <Clock size={18} />;

      case "confirmed":
        return <Package size={18} />;

      case "shipped":
        return <Truck size={18} />;

      case "delivered":
        return <CheckCircle size={18} />;

      default:
        return <Package size={18} />;

    }

  };

  return (

    <MainLayout>

      {/* Hero */}

      <section
        className="
        relative

        overflow-hidden

        py-12
        md:py-20
        "
      >

        <div
          className="
          absolute

          top-0
          left-1/2

          -translate-x-1/2

          w-[900px]
          h-[900px]

          bg-zinc-300/20
          dark:bg-zinc-700/10

          blur-[180px]

          pointer-events-none
          "
        />

        <div
          className="
          max-w-7xl
          mx-auto

          px-6

          relative
          z-10
          "
        >

          <span
            className="
            inline-flex

            px-4
            py-2

            rounded-full

            bg-zinc-100
            dark:bg-zinc-900

            text-sm

            mb-6
            "
          >
            Order Management
          </span>

          <h1
            className="
            text-3xl
            sm:text-5xl
            md:text-7xl

            font-black
            "
          >
            My Orders
          </h1>

          <p
            className="
            mt-5

            text-zinc-500

            max-w-2xl
            "
          >
            Track your purchases, shipping status,
            and order history in one place.
          </p>

        </div>

      </section>

      <section
        className="
        max-w-7xl
        mx-auto

        px-6
        pb-20
        "
      >

        {loading ? (

          <div
            className="
            text-center
            py-20
            "
          >
            Loading Orders...
          </div>

        ) : orders.length === 0 ? (

          <div
            className="
            text-center

            py-24

            border

            rounded-[32px]

            bg-white
            dark:bg-zinc-900
            "
          >

            <Package
              size={60}
              className="
              mx-auto
              mb-5
              "
            />

            <h2
              className="
              text-xl
              md:text-2xl
              font-bold
              "
            >
              No Orders Yet
            </h2>

            <p
              className="
              text-zinc-500
              mt-3
              "
            >
              Start shopping and your orders
              will appear here.
            </p>

          </div>

        ) : (

          <div
            className="
            space-y-8
            "
          >

            {orders.map(
              (order:any)=>(
                <div

                  key={order._id}

                  className="
                  bg-white
                  dark:bg-zinc-900

                  rounded-[32px]

                  border

                  shadow-lg

                  hover:shadow-2xl

                  transition-all

                  p-5
                  md:p-8
                  "
                >

                  {/* Header */}

                  <div
                    className="
                    flex

                    flex-col
                    md:flex-row

                    md:items-center
                    md:justify-between

                    gap-4

                    mb-8
                    "
                  >

                    <div>

                      <h3
                        className="
                        text-xl
                        md:text-2xl
                        font-bold
                        "
                      >
                        Order #
                        {order._id.slice(-6)}
                      </h3>

                      <p
                        className="
                        text-zinc-500
                        mt-1
                        "
                      >
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    <div
                      className={`
                      inline-flex

                      items-center
                      gap-2

                      px-5
                      py-3

                      rounded-full

                      font-semibold

                      ${getStatusColor(
                        order.orderStatus
                      )}
                      `}
                    >

                      {getStatusIcon(
                        order.orderStatus
                      )}

                      {order.orderStatus}

                    </div>

                  </div>

                  {/* Products */}

                  <div
                    className="
                    space-y-4
                    "
                  >

                    {order.products.map(
                      (item:any)=>(
                        <div

                          key={item._id}

                          className="
                          flex
                          flex-col
                          sm:flex-row

                          justify-between

                          gap-2

                          border-b

                          pb-4
                          "
                        >

                          <div>

                            <h4
                              className="
                              font-semibold
                              "
                            >
                              {item.product?.name}
                            </h4>

                            <div
                              className="
                              text-sm
                              text-zinc-500

                              mt-2
                              "
                            >
                              Size:
                              {" "}
                              {item.size || "-"}
                              {" • "}
                              Color:
                              {" "}
                              {item.color || "-"}
                              {" • "}
                              Qty:
                              {" "}
                              {item.quantity}
                            </div>

                          </div>

                          <div
                            className="
                            font-bold
                            "
                          >
                            ₹
                            {
                              item.price *
                              item.quantity
                            }
                          </div>

                        </div>
                      )
                    )}

                  </div>

                  {/* Footer */}

                  <div
                    className="
                    flex
                    flex-col
                    sm:flex-row

                    justify-between

                    gap-2

                    mt-8

                    pt-6

                    border-t
                    "
                  >

                    <span
                      className="
                      text-lg
                      font-semibold
                      "
                    >
                      Total Amount
                    </span>

                    <span
                      className="
                      text-xl
                      md:text-2xl
                      font-black
                      "
                    >
                      ₹
                      {order.totalAmount}
                    </span>

                  </div>

                </div>
              )
            )}

          </div>

        )}

      </section>

    </MainLayout>

  );

}