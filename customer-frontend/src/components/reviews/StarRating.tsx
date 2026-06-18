import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function StarRating({
  rating,
  size = 20,
}: {
  rating: number;
  size?: number;
}) {

  return (

    <div
      className="
      flex
      items-center
      gap-1
      "
    >

      {[1, 2, 3, 4, 5].map((star) => {

        const active =
          star <= rating;

        return (

          <motion.div

            key={star}

            initial={{
              scale: 0.8,
              opacity: 0,
            }}

            animate={{
              scale: 1,
              opacity: 1,
            }}

            transition={{
              delay: star * 0.05,
            }}

            whileHover={{
              scale: 1.25,
              rotate: -10,
            }}

          >

            <Star

              size={size}

              fill={
                active
                  ? "currentColor"
                  : "none"
              }

              strokeWidth={1.8}

              className={`
              transition-all
              duration-300

              ${
                active
                  ? `
                  text-amber-400
                  drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]
                  `
                  : `
                  text-zinc-300
                  dark:text-zinc-700
                  `
              }
              `}
            />

          </motion.div>

        );

      })}

    </div>

  );

}