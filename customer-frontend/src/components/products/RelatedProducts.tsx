import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Sparkles,
} from "lucide-react";

import {
  getRelatedProducts,
} from "../../api/productApi";

import ProductCard
from "./ProductCard";

export default function RelatedProducts({
  categoryId,
  currentProductId,
}: any) {

  const [products,
  setProducts] =
  useState<any[]>([]);

  const [loading,
  setLoading] =
  useState(true);

  useEffect(() => {

    const loadProducts =
    async () => {

      try {

        const res =
        await getRelatedProducts(
          categoryId
        );

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
      finally{

        setLoading(false);

      }

    };

    if(categoryId){

      loadProducts();

    }

  },[
    categoryId,
    currentProductId
  ]);

  if(
    !loading &&
    !products.length
  ){
    return null;
  }

  return (

    <section
      className="
      relative

       mt-16
      md:mt-28
      "
    >

      {/* Background Glow */}

      <div
        className="
        absolute

        top-0
        left-1/2

        -translate-x-1/2

        w-[800px]
        h-[800px]

        bg-zinc-200/30
        dark:bg-zinc-700/10

        blur-[140px]

        pointer-events-none
        "
      />

      {/* Header */}

      <motion.div

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
          duration:0.6,
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

            <Sparkles
              size={16}
            />

            Recommended For You

          </div>

          <h2
            className="
           text-2xl
           md:text-5xl
            font-black
            tracking-tight
            "
          >
            Complete The Look
          </h2>

          <p
            className="
            mt-3

            text-zinc-500

            max-w-xl
            "
          >
           Curated recommendations designed to match your taste, style, and shopping journey.
          </p>

          <p
            className="
            mt-3
            text-sm
            text-zinc-400
            "
          >
            {products.length} handpicked recommendations
          </p>

        </div>

      </motion.div>

      {/* Content */}

      {loading ? (

        <div
          className="
          grid

          grid-cols-2
          lg:grid-cols-4

          gap-6
          "
        >

          {Array.from({
            length:4
          }).map((_,index)=>(

            <div

              key={index}

              className="
              animate-pulse

              aspect-[0.75]

              rounded-[30px]

              bg-zinc-200
              dark:bg-zinc-800
              "
            />

          ))}

        </div>

      ) : (

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
            ) => (

              <motion.div

                key={product._id}

                initial={{
                  opacity:0,
                  y:50,
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
                  delay:index * 0.08,
                }}
              >

                <ProductCard
                  product={product}
                />

              </motion.div>

            )
          )}

        </div>

      )}

    </section>

  );

}