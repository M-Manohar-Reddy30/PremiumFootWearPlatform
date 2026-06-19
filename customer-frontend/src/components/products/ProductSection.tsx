import { motion } from "framer-motion";
import { Flame } from "lucide-react";

import ProductCard from "./ProductCard";

interface Props {
  title: string;
  products: any[];
}

export default function ProductSection({
  title,
  products,
}: Props) {

  if (!products?.length)
    return null;

  return (

    <section
      className="
      py-8
      md:py-16

      relative

      overflow-x-hidden
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
          flex
          flex-col
          md:flex-row

          md:items-center
          md:justify-between

          gap-4

          mb-8
          md:mb-12
          "
        >

          <div>

            <div
              className="
              inline-flex
              items-center
              gap-2

              bg-orange-100
              dark:bg-orange-500/10

              text-orange-600

              px-4
              py-2

              rounded-full

              text-sm
              font-semibold

              mb-4
              "
            >
              <Flame size={16} />
              Hot Collection
            </div>

            <h2
              className="
              text-2xl
              sm:text-4xl
              md:text-6xl

              font-black

              tracking-tight
              "
            >
              {title}
            </h2>

            <p
              className="
              mt-3

              text-sm
              md:text-base

              text-zinc-500

              max-w-full
              md:max-w-2xl
              "
            >
              Discover the most popular footwear loved by our customers.
            </p>

          </div>

          <button
            className="
            self-start

            w-full
            sm:w-fit

            text-center

            text-sm
            md:text-base

            border

            px-5
            md:px-6

            py-3

            rounded-full

            hover:bg-black
            hover:text-white

            transition-all
            duration-300
            "
          >
            View All
          </button>

        </motion.div>

        {/* Products */}

        <motion.div

          initial={{
            opacity: 0,
          }}

          whileInView={{
            opacity: 1,
          }}

          viewport={{
            once: true,
          }}

          transition={{
            duration: 0.6,
          }}

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
              product: any,
              index: number
            ) => (

              <motion.div

                key={product._id}

                initial={{
                  opacity: 0,
                  y: 50,
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
                  duration: 0.5,
                }}
              >

                <ProductCard
                  product={product}
                />

              </motion.div>

            )
          )}

        </motion.div>

      </div>

    </section>

  );

}