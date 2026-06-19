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

export default function CartPage() {

  const {

    cartItems,

    summary,

    updateItem,

    removeItem,

  } =
  useCart();

  const { getToken } =
    useAuth();

  const handleCheckout =
  async()=>{

    try{

      const token =
      await getToken();

      if(!token){

        alert(
          "Please login"
        );

        return;

      }

      const res =
      await placeOrder(
        token
      );

      window.location.href =
      res.data.whatsappUrl;

    }
    catch(error:any){

      alert(

        error?.response?.data
        ?.message ||

        "Order Failed"

      );

    }

  };

  if(
    cartItems.length === 0
  ){

    return (

      <MainLayout>

        <div
          className="
          max-w-4xl
          mx-auto

          px-6
          py-24

          text-center
          "
        >

          <h1
            className="
            text-3xl
            md:text-4xl
            font-bold
            "
          >
            Your Cart Is Empty
          </h1>

          <p
            className="
            mt-4
            text-zinc-500
            "
          >
            Add products to continue shopping.
          </p>

        </div>

      </MainLayout>

    );

  }

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
          text-3xl
          md:text-4xl

          mb-10
          "
        >
          Shopping Cart
        </h1>

        <div
          className="
          grid

          lg:grid-cols-3

          gap-10
          "
        >

          {/* Items */}

          <div
            className="
            lg:col-span-2

            space-y-6
            "
          >

            {cartItems.map(
              (item:any)=>{

                const product =
                item.product;

                return (

                  <div

                    key={
                      product._id +
                      item.size +
                      item.color
                    }

                    className="
                    flex
                    flex-col
                    sm:flex-row

                    gap-4

                    border

                    rounded-3xl

                    p-3
                    md:p-4
                    "
                  >

                    <img
                      src={
                        product.images?.[0]
                        ?.url
                      }
                      alt={
                        product.name
                      }
                      className="
                      w-full
                      sm:w-28

                      h-40
                      sm:h-28

                      object-cover

                      rounded-xl
                      "
                    />

                    <div
                      className="
                      flex-1
                      "
                    >

                      <h3
                        className="
                        font-semibold
                        text-lg
                        "
                      >
                        {
                          product.name
                        }
                      </h3>

                      <p
                        className="
                        text-zinc-500
                        "
                      >
                        Size:
                        {" "}
                        {
                          item.size || "-"
                        }
                      </p>

                      <p
                        className="
                        text-zinc-500
                        "
                      >
                        Color:
                        {" "}
                        {
                          item.color || "-"
                        }
                      </p>

                      <div
                        className="
                        mt-3

                        flex
                        items-center

                        gap-2
                        "
                      >

                        <button

                          onClick={() =>
                                updateItem(
                                    product._id,
                                    item.size,
                                    item.color,

                                    Math.max(
                                        1,
                                        item.quantity - 1
                                    )
                                )
                            }

                          className="
                          border

                          w-10
                          h-10

                          flex
                          items-center
                          justify-center

                          rounded-lg
                          "
                        >
                          -
                        </button>

                        <span>
                          {
                            item.quantity
                          }
                        </span>

                        <button

                            onClick={() =>
                                updateItem(
                                    product._id,
                                    item.size,
                                    item.color,
                                    item.quantity + 1
                                )
                            }

                          className="
                          border

                          w-10
                          h-10

                          flex
                          items-center
                          justify-center

                          rounded-lg
                          "
                        >
                          +
                        </button>

                      </div>

                    </div>

                    <div
                      className="
                      text-left
                      sm:text-right
                      "
                    >

                      <p
                        className="
                        font-bold
                        "
                      >
                        ₹
                        {
                          (
                            product.discountPrice ||
                            product.price
                          ) *
                          item.quantity
                        }
                      </p>

                      <button

                        onClick={() =>
                            removeItem(
                                product._id,
                                item.size,
                                item.color
                            )
                        }

                        className="
                        mt-4

                        text-red-500
                        "
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                );

              }
            )}

          </div>

          {/* Summary */}

          <div
            className="
            lg:sticky
            lg:top-24

            h-fit
            "
          >

            <div
              className="
              border

              rounded-3xl

              p-6
              "
            >

              <h2
                className="
                text-2xl
                font-bold

                mb-6
                "
              >
                Order Summary
              </h2>

              <div
                className="
                flex

                justify-between

                mb-3
                "
              >
                <span>
                  Subtotal
                </span>

                <span>
                  ₹
                  {
                    summary.subtotal
                  }
                </span>
              </div>

              <div
                className="
                flex

                justify-between

                text-lg
                font-bold
                "
              >
                <span>
                  Total
                </span>

                <span>
                  ₹
                  {
                    summary.total
                  }
                </span>
              </div>

                <button

                  onClick={
                    handleCheckout
                  }

                  className="
                  w-full

                  mt-6

                  bg-black
                  text-white

                  py-4

                  rounded-xl
                  "
                >

                  Place Order

                </button>

            </div>

          </div>

        </div>

      </div>

      <div
        className="
        md:hidden

        fixed
        bottom-16
        left-0
        right-0

        bg-white
        dark:bg-zinc-950

        border-t

        p-4

        z-40
        "
      >

        <div
          className="
          flex
          items-center
          justify-between
          "
        >

          <div>

            <p className="text-xs">
              Total
            </p>

            <p className="font-bold text-lg">
              ₹{summary.total}
            </p>

          </div>

          <button
            onClick={handleCheckout}
            className="
            bg-black
            text-white

            px-6
            py-3

            rounded-xl
            "
          >
            Checkout
          </button>

        </div>

      </div>

    </MainLayout>

  );

}