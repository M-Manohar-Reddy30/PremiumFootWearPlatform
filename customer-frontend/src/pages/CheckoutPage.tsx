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
        max-w-5xl
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
                  key={
                    product._id
                  }

                  className="
                  border

                  rounded-xl

                  p-4
                  "
                >

                  <h3>
                    {
                      product.name
                    }
                  </h3>

                  <p>
                    Size:
                    {" "}
                    {item.size}
                  </p>

                  <p>
                    Color:
                    {" "}
                    {item.color}
                  </p>

                  <p>
                    Qty:
                    {" "}
                    {item.quantity}
                  </p>

                </div>

              );

            }
          )}

        </div>

        <div
          className="
          mt-8

          border-t

          pt-6
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

            px-8
            py-4

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