import { motion } from "framer-motion";

export default function BrandStory() {

  return (

    <section
      className="
      py-32

      bg-black

      text-white
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto

        px-6

        grid
        md:grid-cols-2

        gap-16

        items-center
        "
      >

        <motion.div

          initial={{
            opacity:0,
            x:-50
          }}

          whileInView={{
            opacity:1,
            x:0
          }}

          viewport={{
            once:true
          }}
        >

          <p
            className="
            uppercase

            tracking-[6px]

            text-white/60

            mb-4
            "
          >
            Our Story
          </p>

          <h2
            className="
            text-5xl

            font-black

            mb-6
            "
          >
            Crafted For
            Every Step
          </h2>

          <p
            className="
            text-white/70

            leading-8
            "
          >
            We believe footwear should
            combine comfort, durability
            and modern style.

            Every collection is designed
            with premium materials and
            built for everyday performance.
          </p>

        </motion.div>

        <motion.div

          initial={{
            opacity:0,
            x:50
          }}

          whileInView={{
            opacity:1,
            x:0
          }}

          viewport={{
            once:true
          }}
        >

          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            alt="Brand Story"
            className="
            rounded-[40px]

            w-full

            h-[500px]

            object-cover
            "
          />

        </motion.div>

      </div>

    </section>

  );

}