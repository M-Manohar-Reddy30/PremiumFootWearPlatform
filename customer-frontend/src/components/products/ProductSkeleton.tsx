import { motion } from "framer-motion";

export default function ProductSkeleton() {

  return (

    <motion.div

      initial={{
        opacity: 0,
      }}

      animate={{
        opacity: 1,
      }}

      className="
      overflow-hidden

      rounded-[32px]

      border
      border-zinc-200
      dark:border-zinc-800

      bg-white
      dark:bg-zinc-900

      shadow-sm
      "
    >

      {/* Image */}

      <div
        className="
        relative

        aspect-square

        overflow-hidden
        "
      >

        <div
          className="
          absolute
          inset-0

          animate-pulse

          bg-gradient-to-r

          from-zinc-200
          via-zinc-100
          to-zinc-200

          dark:from-zinc-800
          dark:via-zinc-700
          dark:to-zinc-800
          "
        />

      </div>

      {/* Content */}

      <div
        className="
        p-5
        "
      >

        <div
          className="
          h-4

          w-20

          rounded-full

          animate-pulse

          bg-zinc-200
          dark:bg-zinc-800

          mb-4
          "
        />

        <div
          className="
          h-6

          rounded-xl

          animate-pulse

          bg-zinc-200
          dark:bg-zinc-800

          mb-3
          "
        />

        <div
          className="
          h-4

          w-3/4

          rounded-xl

          animate-pulse

          bg-zinc-200
          dark:bg-zinc-800

          mb-6
          "
        />

        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          <div
            className="
            h-6
            w-24

            rounded-xl

            animate-pulse

            bg-zinc-200
            dark:bg-zinc-800
            "
          />

          <div
            className="
            h-4
            w-16

            rounded-xl

            animate-pulse

            bg-zinc-200
            dark:bg-zinc-800
            "
          />

        </div>

      </div>

    </motion.div>

  );

}