import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import ProductCard from "./ProductCard";

export default function NewArrivals() {

  const arrivals =
    useSelector(
      (state: any) =>
        state.home.arrivals
    );

  if (!arrivals?.length)
    return null;

  const heroProduct =
    arrivals[0];

  const gridProducts =
    arrivals.slice(1, 5);

  return (

    <section
      className="
      py-10
      md:py-20

      relative

      overflow-x-hidden

      bg-gradient-to-b
      from-zinc-100
      to-white

      dark:from-zinc-950
      dark:to-black
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto

        px-4
        sm:px-5
        md:px-6
        "
      >

        {/* Header */}

        <motion.div

          initial={{
            opacity: 0,
            y: 40,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
          }}

          transition={{
            duration: 0.6,
          }}

          className="
          text-center

          mb-8
          md:mb-16
          "
        >

          <span
            className="
            inline-block

            px-3
            md:px-4

            py-1.5
            md:py-2

            rounded-full

            bg-black
            text-white

            text-sm
            font-semibold

            mb-5
            "
          >
            JUST DROPPED
          </span>

          <h2
            className="
            text-3xl
            sm:text-4xl
            md:text-7xl

            font-black

            tracking-tight
            "
          >
            Latest Drops
          </h2>

          <p
            className="
            mt-4

            text-zinc-500

            max-w-full
            md:max-w-2xl
            mx-auto
            "
          >
            Fresh arrivals designed for comfort,
            performance and everyday style.
          </p>

        </motion.div>

        {/* Hero Product */}

        <motion.div

          initial={{
            opacity: 0,
            y: 60,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
          }}

          transition={{
            duration: 0.7,
          }}

          className="
          relative

          overflow-hidden

          rounded-[24px]
          md:rounded-[40px]

          mb-8
          md:mb-12

          bg-black
          text-white
          "
        >

          <div
            className="
            grid

            grid-cols-1

            lg:grid-cols-2
            "
          >

            <div
              className="
              p-5
              sm:p-6
              md:p-16

              flex
              flex-col
              justify-center
              "
            >

              <span
                className="
                text-zinc-400

                uppercase

                tracking-[3px]
                md:tracking-[5px]

                text-sm
                "
              >
                New Arrival
              </span>

              <h3
                className="
                text-2xl
                sm:text-3xl
                md:text-6xl

                font-black

                mt-4
                "
              >
                {heroProduct.name}
              </h3>

              <p
                className="
                mt-5

                text-zinc-300

                max-w-full
                md:max-w-xl
                "
              >
                {heroProduct.description}
              </p>

              <div
                className="
                mt-8

                text-2xl
                sm:text-3xl
                md:text-4xl
                font-bold
                "
              >
                ₹
                {
                  heroProduct.discountPrice ||
                  heroProduct.price
                }
              </div>

            </div>

            <div
              className="
              h-full
              "
            >

              <img
                src={
                  heroProduct.images?.[0]?.url
                }
                alt={
                  heroProduct.name
                }
                className="
                w-full

                h-[250px]
                sm:h-[320px]
                lg:h-full

                object-cover

                hover:scale-105

                transition-transform
                duration-700
                "
              />

            </div>

          </div>

        </motion.div>

        {/* Products Grid */}

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

          {gridProducts.map(
            (
              product: any,
              index: number
            ) => (

              <motion.div

                key={product._id}

                initial={{
                  opacity: 0,
                  y: 40,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                viewport={{
                  once: true,
                }}

                transition={{
                  delay: index * 0.05,
                  duration: 0.4
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