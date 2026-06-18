import { useSelector } from "react-redux";
import { useRef } from "react";

import {
  motion,
} from "framer-motion";

import {
  ArrowRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import useGSAPReveal
from "../../hooks/useGSAPReveal";

import ProductCard
from "./ProductCard";

export default function FeaturedProducts() {

  const featured =
  useSelector(
    (state:any)=>
    state.home.featured
  );

  const sectionRef =
  useRef<HTMLElement>(null);

  useGSAPReveal(
    sectionRef
  );

  if (!featured?.length)
    return null;

  return (

    <section
      ref={sectionRef}
      className="
      py-24
      md:py-32

      relative
      overflow-hidden
      "
    >

      {/* Background Glow */}

      <div
        className="
        absolute

        top-0
        left-1/2

        -translate-x-1/2

        w-[600px]
        h-[600px]

        rounded-full

        bg-zinc-200/30
        dark:bg-zinc-800/20

        blur-[150px]

        pointer-events-none
        "
      />

      <div
        className="
        max-w-7xl
        mx-auto

        px-5
        md:px-6

        relative
        z-10
        "
      >

        {/* Header */}

        <div
          className="
          flex
          flex-col
          lg:flex-row

          lg:items-end
          lg:justify-between

          gap-6

          mb-14
          "
        >

          <div>

            <span
              className="
              inline-block

              text-xs
              md:text-sm

              uppercase

              tracking-[4px]

              text-zinc-500

              mb-4
              "
            >
              Premium Footwear
            </span>

            <motion.h2

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

              className="
              text-4xl
              md:text-6xl

              font-black

              leading-tight
              "
            >
              Featured
              <br />
              Collection
            </motion.h2>

            <p
              className="
              mt-5

              max-w-2xl

              text-zinc-500

              text-base
              md:text-lg
              "
            >
              Discover our handpicked premium footwear
              collection crafted for comfort,
              performance and everyday luxury.
            </p>

          </div>

          <Link
            to="/products"
            className="
            group

            flex
            items-center

            gap-2

            font-semibold

            hover:gap-4

            transition-all
            "
          >
            View All Products

            <ArrowRight
              size={18}
              className="
              transition-transform

              group-hover:translate-x-1
              "
            />
          </Link>

        </div>

        {/* Products Grid */}

        <div
          className="
          grid

          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4

          gap-5
          md:gap-8
          "
        >

          {featured.map(
            (
              product:any,
              index:number
            ) => (

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
                  delay:
                  index * 0.08,
                }}

              >

                <ProductCard
                  product={product}
                />

              </motion.div>

            )
          )}

        </div>

      </div>

    </section>

  );

}