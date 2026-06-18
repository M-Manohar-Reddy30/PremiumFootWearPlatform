import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  History,
  ArrowRight,
} from "lucide-react";

import ProductCard
from "./ProductCard";

import useRecentlyViewed
from "../../hooks/useRecentlyViewed";

interface Props {
  currentProductId:string;
}

export default function RecentlyViewed({
  currentProductId,
}:Props){

  const {
    getProducts,
  } =
  useRecentlyViewed();

  const [products,
  setProducts] =
  useState<any[]>([]);

  useEffect(()=>{

    const viewedProducts =

    getProducts().filter(
      (product:any)=>
        product._id !==
        currentProductId
    );

    setProducts(
      viewedProducts.slice(0,4)
    );

  },[
    currentProductId
  ]);

  if(
    products.length === 0
  ){
    return null;
  }

  return (

    <section
      className="
      relative

      mt-28
      "
    >

      {/* Glow */}

      <div
        className="
        absolute

        top-0
        right-0

        w-[700px]
        h-[700px]

        bg-zinc-300/20
        dark:bg-zinc-700/10

        blur-[120px]

        pointer-events-none
        "
      />

      {/* Header */}

      <motion.div

        initial={{
          opacity:0,
          y:30,
        }}

        whileInView={{
          opacity:1,
          y:0,
        }}

        viewport={{
          once:true,
        }}

        transition={{
          duration:0.5,
        }}

        className="
        flex

        flex-col
        md:flex-row

        md:items-end
        md:justify-between

        gap-4

        mb-10
        "
      >

        <div>

          <div
            className="
            inline-flex

            items-center
            gap-2

            px-4
            py-2

            rounded-full

            bg-zinc-100
            dark:bg-zinc-900

            text-sm

            mb-4
            "
          >

            <History size={16} />

            Continue Exploring

          </div>

          <h2
            className="
            text-3xl
            md:text-5xl

            font-black

            tracking-tight
            "
          >
           Continue Shopping
          </h2>

          <p
            className="
            mt-3

            text-zinc-500

            max-w-xl
            "
          >
           Your recently explored styles, ready whenever you are.
          </p>

        </div>

        <div
          className="
          flex
          items-center
          gap-2

          text-zinc-500
          "
        >

          <span>
            {products.length}
            {" "}
            Products
          </span>

          <ArrowRight
            size={18}
          />

        </div>

      </motion.div>

      {/* Products */}

      <div
        className="
        grid

        grid-cols-2
        lg:grid-cols-4

        gap-6
        lg:gap-8
        "
      >

        {products.map(
          (
            product:any,
            index:number
          )=>(

            <motion.div

              key={product._id}

              initial={{
                opacity:0,
                y:40,
              }}

              whileInView={{
                opacity:1,
                y:0,
              }}

              viewport={{
                once:true,
              }}

              transition={{
                delay:index * 0.08,
                duration:0.5,
              }}
            >

              <ProductCard
                product={product}
              />

            </motion.div>

          )
        )}

      </div>

    </section>

  );

}