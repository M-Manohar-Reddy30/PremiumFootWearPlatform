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
      py-8
      md:py-16

      relative
      overflow-hidden
      "
    >

      {/* Background Glow */}

      <div
        className="
        hidden md:block

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

        px-4
        sm:px-5
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

          sm:flex-row

          sm:items-end
          sm:justify-between

          gap-4

          lg:items-end
          lg:justify-between

          mb-8
          md:mb-12
          "
        >

          <div className="flex-1">

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
              text-2xl
              sm:text-4xl
              md:text-5xl

              font-black

              leading-tight
              "
            >
              Featured
              <br />
              Featured Collection
            </motion.h2>

            <p
              className="
              mt-5

              max-w-full
              md:max-w-2xl

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

            inline-flex

            items-center

            gap-2

            self-start

            text-sm
            md:text-base

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

          grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4

          gap-4
          md:gap-6
          lg:gap-8
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
                  duration: 0.4,
                  delay: index * 0.05,
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