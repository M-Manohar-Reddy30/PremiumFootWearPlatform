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
  getWishlist,
  removeWishlist,
} from "../api/wishlistApi";

import ProductCard
from "../components/products/ProductCard";

export default function WishlistPage() {

  const { getToken } =
  useAuth();

  const [products,setProducts] =
  useState<any[]>([]);

  const [loading,setLoading] =
  useState(true);

  const loadWishlist =
  async()=>{

    try{

      const token =
      await getToken();

      const res =
      await getWishlist(
        token!
      );

      setProducts(
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

  const handleRemove =
    async(
    productId:string
    )=>{

    try{

        const token =
        await getToken();

        await removeWishlist(
        productId,
        token!
        );

        setProducts(

        products.filter(
            item =>
            item._id !==
            productId
        )

        );

    }
    catch(error){

        console.error(error);

    }

    };

  useEffect(()=>{

    loadWishlist();

  },[]);

  if(loading){

    return (
      <MainLayout>
        <div className="p-20">
          Loading...
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
          text-4xl
          font-bold
          mb-8
          "
        >
          My Wishlist
        </h1>

        {products.length === 0 ? (

          <div
                className="
                text-center
                py-20
                "
                >

                <h2
                    className="
                    text-2xl
                    font-bold
                    "
                >
                    Wishlist Empty
                </h2>

                <p
                    className="
                    text-zinc-500
                    mt-2
                    "
                >
                    Save products you love ❤️
                </p>

            </div>

        ) : (

          <div
            className="
            grid

            grid-cols-2
            md:grid-cols-4

            gap-6
            "
          >

            {products.map(
                (product:any)=>(

                    <div
                    key={product._id}
                    className="relative"
                    >

                    <ProductCard
                        product={product}
                    />

                    <button

                        onClick={() =>
                        handleRemove(
                            product._id
                        )
                        }

                        className="
                        absolute
                        top-3
                        right-3

                        bg-white

                        px-3
                        py-1

                        rounded-full

                        text-red-500

                        shadow
                        "
                    >
                        ❤️
                    </button>

                    </div>

                )
            )}

          </div>

        )}

      </div>

    </MainLayout>

  );

}