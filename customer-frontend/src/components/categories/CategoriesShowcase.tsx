import { useSelector } from "react-redux";

import CategoryCard
from "./CategoryCard";

import { useRef } from "react";

import { motion }
from "framer-motion";

import useGSAPReveal
from "../../hooks/useGSAPReveal";

export default function CategoriesShowcase() {

  const categories =
  useSelector(
    (state:any)=>
    state.home.categories
  );

  const sectionRef =
  useRef<HTMLElement>(null);

  useGSAPReveal(
    sectionRef
  );

  if (!categories?.length)
  return null;

  return (

    <section
      ref={sectionRef}
      className="
      relative

      py-28

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

        w-[700px]
        h-[700px]

        bg-black/5

        rounded-full

        blur-[120px]
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

        {/* Section Header */}

        <motion.div

          initial={{
            opacity:0,
            y:40
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          transition={{
            duration:0.8
          }}

          className="
          text-center

          mb-16
          "
        >

          <p
            className="
            uppercase

            tracking-[6px]

            text-zinc-500

            text-sm

            mb-4
            "
          >
            Explore Collections
          </p>

          <h2
            className="
            text-5xl
            md:text-6xl

            font-black

            mb-6
            "
          >
            Shop By Category
          </h2>

          <p
            className="
            max-w-3xl

            mx-auto

            text-zinc-500

            text-lg
            "
          >
            Discover premium footwear
            collections designed for
            performance, comfort,
            lifestyle and everyday wear.
          </p>

        </motion.div>

        {/* Categories Grid */}

        <div
          className="
          grid

          md:grid-cols-2
          xl:grid-cols-3

          gap-8
          "
        >

          {categories.map(
            (category:any)=>(
              <CategoryCard
                key={category._id}
                category={category}
              />
            )
          )}

        </div>

      </div>

    </section>

  );

}