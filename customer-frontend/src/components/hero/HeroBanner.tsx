import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { fetchHomeData } from "../../features/home/homeSlice";

export default function HeroBanner() {

  const dispatch = useDispatch();

  const {
    banners,
    loading,
  } =
  useSelector(
    (state: any) =>
      state.home
  );

  const [currentBanner, setCurrentBanner] =
  useState(0);

  useEffect(() => {

    dispatch(
      fetchHomeData() as any
    );

  }, [dispatch]);

  useEffect(() => {

    if (!banners?.length) return;

    const interval =
    setInterval(() => {

      setCurrentBanner((prev) =>

        prev === banners.length - 1
        ? 0
        : prev + 1

      );

    }, 5000);

    return () =>
      clearInterval(interval);

  }, [banners]);

  if (loading) {

    return (

      <section
        className="
        h-screen
        flex
        items-center
        justify-center
        bg-black
        text-white
        "
      >
        Loading...
      </section>

    );

  }

  const banner =
  banners?.[currentBanner];

  if (!banner) {

    return null;

  }

  return (

    <section
      className="
      relative
      min-h-[80vh]
      md:min-h-screen
      overflow-hidden

      bg-gradient-to-r
      from-zinc-950
      via-zinc-900
      to-zinc-800
      "
    >

      {/* Glow */}

      <div
        className="
        absolute
        top-20
        right-20

        w-[500px]
        h-[500px]

        bg-white/5

        rounded-full

        blur-[140px]
        "
      />

      <div
        className="
        absolute
        bottom-0
        left-0

        w-[400px]
        h-[400px]

        bg-white/5

        rounded-full

        blur-[120px]
        "
      />

      {/* Main Layout */}

      <div
        className="
        relative
        z-10

        max-w-7xl
        mx-auto

        px-6

        min-h-[80vh]
        md:min-h-screen

        grid
        lg:grid-cols-2

        items-center

        gap-12
        "
      >

        {/* LEFT */}

        <div>

          <motion.span

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            className="
            inline-block

            text-white/60

            uppercase

            tracking-[8px]

            text-sm

            mb-6
            "
          >
            Luxury Footwear 2026
          </motion.span>

          <motion.h1

            initial={{
              opacity: 0,
              y: 50
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              delay: 0.2
            }}

            className="
            text-white

            font-black

            text-4xl
            sm:text-5xl
            md:text-7xl
            xl:text-8xl

            leading-none
            "
          >
            {banner.title}
          </motion.h1>

          <motion.p

            initial={{
              opacity: 0,
              y: 30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              delay: 0.4
            }}

            className="
            mt-8

            text-zinc-300

            text-lg
            md:text-xl

            max-w-xl
            "
          >
            {banner.subtitle}
          </motion.p>

          <motion.div

            initial={{
              opacity: 0,
              y: 20
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              delay: 0.6
            }}

            className="
            flex
            flex-wrap

            gap-4

            mt-10
            "
          >

            <a
              href={banner.buttonLink}
              className="
              px-8
              py-4

              bg-white

              text-black

              rounded-full

              font-semibold

              hover:scale-105
              hover:shadow-[0_20px_50px_rgba(255,255,255,0.25)]

              transition
              "
            >
              {banner.buttonText}
            </a>

            <a
              href="/products"
              className="
              px-8
              py-4

              border
              border-white/30

              text-white

              rounded-full

              hover:bg-white
              hover:text-black

              transition
              "
            >
              Explore Collection
            </a>

          </motion.div>

          {/* Trust Badges */}

          <motion.div

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            transition={{
              delay: 1
            }}

            className="
            flex
            flex-wrap

            gap-6

            mt-10

            text-zinc-300
            "
          >

            <span>
              ✓ Free Delivery
            </span>

            <span>
              ✓ Easy Returns
            </span>

            <span>
              ✓ Secure Payment
            </span>

            <div
              className="
              grid
              grid-cols-3

              gap-3
              md:gap-8

              mt-10

              max-w-lg
              "
            >

              <div>
                <h3 className="
                  text-2xl
                  md:text-3xl
                  font-black
                  text-white
                  "
                >
                  50K+
                </h3>
                <p className="text-zinc-400 text-sm">
                  Customers
                </p>
              </div>

              <div>
                <h3 className="
                  text-2xl
                  md:text-3xl
                  font-black
                  text-white
                  "
                >
                  500+
                </h3>
                <p className="text-zinc-400 text-sm">
                  Products
                </p>
              </div>

              <div>
                <h3 className="
                  text-2xl
                  md:text-3xl
                  font-black
                  text-white
                  "
                >
                  4.9★
                </h3>
                <p className="text-zinc-400 text-sm">
                  Rating
                </p>
              </div>

            </div>

          </motion.div>

        </div>

        {/* RIGHT */}

        <motion.div

          initial={{
            opacity: 0,
            x: 100
          }}

          animate={{
            opacity: 1,
            x: 0
          }}

          transition={{
            duration: 1
          }}

          className="
          hidden
          lg:flex

          justify-center
          items-center
          "
        >

          <div
            className="
            absolute

            w-[500px]
            h-[500px]

            rounded-full

            bg-white/10

            blur-[120px]
            "
          />

          <motion.img

            key={currentBanner}

            initial={{
              opacity: 0,
              x: 100,
              y: 0
            }}

            animate={{
              opacity: 1,
              x: 0,
              y: [0, -25, 0]
            }}

            transition={{
              opacity: {
                duration: 0.8
              },

              x: {
                duration: 0.8
              },

              y: {
                repeat: Infinity,
                duration: 4
              }
            }}

            src={banner.image.url}
            alt={banner.title}

            className="
            max-h-[760px]
            object-contain

            drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]
            "
          />

        </motion.div>

      </div>

      {/* Scroll Indicator */}

      <motion.div

        animate={{
          y: [0, 12, 0]
        }}

        transition={{
          repeat: Infinity,
          duration: 1.5
        }}

        className="
        absolute

        bottom-8
        left-1/2

        -translate-x-1/2

        text-white
        text-2xl
        "
      >
        ↓
      </motion.div>

      <div
        className="
        absolute
        bottom-24
        left-1/2
        -translate-x-1/2

        flex
        gap-3

        z-30
        "
      >

        {banners.map(
          (_: any, index: number) => (

            <button

              key={index}

              onClick={() =>
                setCurrentBanner(index)
              }

              className={`
              h-3
              rounded-full
              transition-all

              ${
                currentBanner === index
                ? "w-10 bg-white"
                : "w-3 bg-white/40"
              }
              `}
            />

          )
        )}

      </div>

    </section>

  );

}