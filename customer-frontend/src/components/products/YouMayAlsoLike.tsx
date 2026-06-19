import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Sparkles,
  ArrowRight,
} from "lucide-react";

import {
  getProducts,
} from "../../api/productApi";

import ProductCard
from "./ProductCard";

export default function YouMayAlsoLike({
  currentProductId,
}:any){

  const [products,
  setProducts] =
  useState<any[]>([]);

  useEffect(()=>{

    loadProducts();

  },[]);

  const loadProducts =
  async()=>{

    try{

      const res =
      await getProducts({

        trending:true,

        limit:8,

      });

      const filtered =

      res.data.products.filter(
        (product:any)=>

          product._id !==
          currentProductId
      );

      setProducts(
        filtered.slice(0,4)
      );

    }
    catch(error){

      console.error(error);

    }

  };

  if(!products.length)
    return null;

  return (

    <section
      className="
      relative

      mt-16
      md:mt-32
      "
    >

      {/* Background Glow */}

      <div
        className="
        hidden md:block

        absolute
        left-1/2
        top-0
        -translate-x-1/2

        w-[600px]
        h-[300px]

        bg-zinc-300/20
        dark:bg-zinc-700/10

        blur-[140px]

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
        lg:flex-row

        lg:items-end
        lg:justify-between

        gap-4

        mb-12
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

            <Sparkles
              size={16}
            />

            AI Curated Picks

          </div>

          <h2
            className="
           text-2xl
            md:text-5xl

            font-black

            tracking-tight
            "
          >
            You May Also Like
          </h2>

          <p
            className="
            mt-3

            text-zinc-500

            max-w-2xl
            "
          >
            Personalized recommendations selected based on trending products and customer interest.
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
            Recommendations
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

        gap-4
        md:gap-6
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