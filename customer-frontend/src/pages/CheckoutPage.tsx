import MainLayout
from "../layouts/MainLayout";

import {
  useCart,
} from "../providers/CartProvider";

import {
  useAuth,
} from "@clerk/clerk-react";

import {
  placeOrder,
} from "../api/orderApi";

export default function CheckoutPage(){

  const {
    cartItems,
    summary,
  } =
  useCart();

  const {
    getToken,
  } =
  useAuth();

  const handlePlaceOrder =
  async()=>{

    try{

      const token =
      await getToken();

      const res =
      await placeOrder(
        token!
      );

      window.location.href =
      res.data.whatsappUrl;

    }
    catch(error){

      console.error(error);

      alert(
        "Order Failed"
      );

    }

  };

  return(

    <MainLayout>

      <div
        className="
        max-w-6xl
        mx-auto

        px-4
        md:px-6
        py-12
        "
      >

        <h1
          className="
          text-3xl
          md:text-4xl
          font-bold
          mb-10
          "
        >
          Checkout
        </h1>

        <div
          className="
          space-y-4
          "
        >

          {cartItems.map(
            (item:any)=>{

              const product =
              item.product;

              return(

                <div
                  key={product._id}
                  className="
                  flex
                  gap-4

                  border
                  rounded-2xl

                  p-4
                  "
                >

                  <img
                    src={
                      product.images?.[0]?.url
                    }
                    alt={product.name}
                    className="
                    w-16
                    h-16

                    sm:w-20
                    sm:h-20

                    object-cover

                    rounded-xl
                    "
                  />

                  <div className="flex-1">

                    <h3
                      className="
                      font-semibold
                      "
                    >
                      {product.name}
                    </h3>

                    <p className="text-zinc-500">
                      Size: {item.size}
                    </p>

                    <p className="text-zinc-500">
                      Color: {item.color}
                    </p>

                    <p className="text-zinc-500">
                      Qty: {item.quantity}
                    </p>

                    <p
                      className="
                      mt-2
                      font-bold
                      "
                    >
                      ₹
                      {
                        (product.discountPrice ||
                        product.price) *
                        item.quantity
                      }
                    </p>

                  </div>

                </div>

              );

            }
          )}

        </div>

        <div
          className="
          mt-10

          bg-zinc-50
          dark:bg-zinc-900

          rounded-3xl

          p-6
          "
        >

          <h2
            className="
            text-2xl
            font-bold
            "
          >
            Total:
            {" "}
            ₹
            {
              summary.total
            }
          </h2>

          <button

            onClick={
              handlePlaceOrder
            }

            className="
            mt-6

            bg-green-600
            text-white

            w-full

            py-4

            font-semibold
            text-lg

            rounded-xl
            "
          >
            Order Via WhatsApp
          </button>

        </div>

      </div>

    </MainLayout>

  );

}