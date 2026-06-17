import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategoryCard({
  category,
}: any) {

  return (

    <motion.div

      whileHover={{
        y: -10,
      }}

      transition={{
        duration: 0.3,
      }}

      className="
      group

      relative

      overflow-hidden

      rounded-[32px]

      h-[420px]

      shadow-lg
      hover:shadow-2xl
      "
    >

      <Link
        to={`/category/${category.slug}`}
      >

        {/* Background Image */}

        <img
          src={category.image}
          alt={category.name}
          className="
          absolute
          inset-0

          w-full
          h-full

          object-cover

          transition-transform
          duration-1000

          group-hover:scale-110
          "
        />

        {/* Premium Overlay */}

        <div
          className="
          absolute
          inset-0

          bg-gradient-to-t

          from-black/90
          via-black/40
          to-transparent
          "
        />

        {/* Glow Effect */}

        <div
          className="
          absolute

          -bottom-20
          left-1/2

          -translate-x-1/2

          w-72
          h-72

          bg-white/10

          blur-3xl

          opacity-0

          group-hover:opacity-100

          transition-all
          duration-700
          "
        />

        {/* Content */}

        <div
          className="
          absolute

          bottom-0

          p-8

          w-full
          "
        >

          <p
            className="
            uppercase

            tracking-[4px]

            text-xs

            text-white/70

            mb-3
            "
          >
            Premium Collection
          </p>

          <h3
            className="
            text-white

            text-4xl

            font-black

            mb-3
            "
          >
            {category.name}
          </h3>

          <p
            className="
            text-white/80

            line-clamp-2

            mb-5
            "
          >
            {category.description ||
              "Discover premium footwear crafted for comfort, style and performance."
            }
          </p>

          <div
            className="
            inline-flex

            items-center

            gap-2

            text-white

            font-semibold

            transition-all

            group-hover:gap-4
            "
          >

            Explore Collection

            <span>
              →
            </span>

          </div>

        </div>

      </Link>

    </motion.div>

  );

}