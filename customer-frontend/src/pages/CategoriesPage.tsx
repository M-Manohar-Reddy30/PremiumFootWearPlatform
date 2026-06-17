import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import MainLayout
from "../layouts/MainLayout";

import {
  getCategories,
} from "../api/homeApi";

import CategoryCard
from "../components/categories/CategoryCard";

export default function CategoriesPage(){

  const [categories,
  setCategories] =
  useState<any[]>([]);

  const [loading,
  setLoading] =
  useState(true);

  useEffect(()=>{

    loadCategories();

  },[]);

  const loadCategories =
  async()=>{

    try{

      const res =
      await getCategories();

      setCategories(
        res.data.data || []
      );

    }
    catch(error){

      console.error(error);

    }
    finally{

      setLoading(false);

    }

  };

  return (

    <MainLayout>

      {/* Hero Section */}

      <section
        className="
        relative

        min-h-[500px]

        overflow-hidden

        flex
        items-center
        "
      >

        <div
          className="
          absolute
          inset-0

          bg-gradient-to-br

          from-black
          via-zinc-900
          to-black
          "
        />

        <div
          className="
          absolute

          top-20
          right-20

          w-96
          h-96

          bg-white/10

          rounded-full

          blur-3xl
          "
        />

        <div
          className="
          absolute

          bottom-10
          left-10

          w-[500px]
          h-[500px]

          bg-white/5

          rounded-full

          blur-3xl
          "
        />

        <div
          className="
          relative
          z-10

          max-w-7xl
          mx-auto

          px-6
          w-full
          "
        >

          <motion.p

            initial={{
              opacity:0,
              y:20
            }}

            animate={{
              opacity:1,
              y:0
            }}

            className="
            uppercase

            tracking-[6px]

            text-white/70

            mb-4
            "
          >

            Premium Footwear Collection

          </motion.p>

          <motion.h1

            initial={{
              opacity:0,
              y:50
            }}

            animate={{
              opacity:1,
              y:0
            }}

            transition={{
              duration:0.8
            }}

            className="
            text-white

            text-5xl
            md:text-8xl

            font-black

            max-w-5xl
            "
          >

            Shop By Category

          </motion.h1>

          <motion.p

            initial={{
              opacity:0,
              y:40
            }}

            animate={{
              opacity:1,
              y:0
            }}

            transition={{
              delay:0.2
            }}

            className="
            mt-6

            max-w-3xl

            text-white/80

            text-lg
            md:text-xl
            "
          >

            Discover premium footwear collections
            designed for athletes, trendsetters,
            professionals and everyday comfort seekers.

          </motion.p>

          <motion.div

            initial={{
              opacity:0,
              y:30
            }}

            animate={{
              opacity:1,
              y:0
            }}

            transition={{
              delay:0.4
            }}

            className="
            mt-10

            flex
            gap-6

            flex-wrap
            "
          >

            <div
              className="
              backdrop-blur-xl

              bg-white/10

              border
              border-white/20

              rounded-2xl

              px-6
              py-4
              "
            >

              <p
                className="
                text-white/70
                text-sm
                "
              >
                Categories
              </p>

              <p
                className="
                text-white

                text-3xl

                font-bold
                "
              >
                {categories.length}
              </p>

            </div>

            <div
              className="
              backdrop-blur-xl

              bg-white/10

              border
              border-white/20

              rounded-2xl

              px-6
              py-4
              "
            >

              <p
                className="
                text-white/70
                text-sm
                "
              >
                Collections
              </p>

              <p
                className="
                text-white

                text-3xl

                font-bold
                "
              >
                Premium
              </p>

            </div>

          </motion.div>

        </div>

      </section>

      {/* Categories Grid */}

      <section
        className="
        max-w-7xl
        mx-auto

        px-6
        py-24
        "
      >

        {loading ? (

          <div
            className="
            text-center
            py-20
            "
          >
            Loading...
          </div>

        ) : (

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

        )}

      </section>

    </MainLayout>

  );

}