import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  X,
  ArrowUpRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  getProducts,
} from "../../api/productApi";

export default function SearchModal({
  open,
  onClose,
}: any) {

  const [search,
  setSearch] =
  useState("");

  const [products,
  setProducts] =
  useState<any[]>([]);

  const [loading,
  setLoading] =
  useState(false);

  const trending = [
    "Running Shoes",
    "Sneakers",
    "Sports Shoes",
    "Premium Collection",
  ];

  useEffect(() => {

    if (!search.trim()) {

      setProducts([]);

      return;

    }

    const timeout =
      setTimeout(async () => {

        try {

          setLoading(true);

          const res =
            await getProducts({

              search,

              limit: 8,

            });

          setProducts(
            res.data.products || []
          );

        }
        catch (error) {

          console.error(error);

        }
        finally {

          setLoading(false);

        }

      }, 300);

    return () =>
      clearTimeout(timeout);

  }, [search]);

  useEffect(() => {

    const handleEsc =
      (e: KeyboardEvent) => {

        if (
          e.key === "Escape"
        ) {

          onClose();

        }

      };

    window.addEventListener(
      "keydown",
      handleEsc
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleEsc
      );

    };

  }, []);

  useEffect(() => {

    document.body.style.overflow =
      open ? "hidden" : "auto";

    return () => {

      document.body.style.overflow =
        "auto";

    };

  }, [open]);

  if (!open) {

    return null;

  }

  return (

    <AnimatePresence>

      <motion.div

        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        exit={{
          opacity: 0,
        }}

        onClick={onClose}

        className="
        fixed
        inset-0

        z-[9999]

        bg-black/70

        backdrop-blur-xl

        flex
        justify-center

        p-0
        md:px-4
        md:pt-20
        "
      >

        <motion.div

          initial={{
            opacity: 0,
            y: -40,
            scale: 0.95,
          }}

          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}

          exit={{
            opacity: 0,
            y: -20,
          }}

          transition={{
            duration: 0.3,
          }}

          onClick={(e) =>
            e.stopPropagation()
          }

          className="
          w-full

          h-[100dvh]
          md:h-auto

          max-w-4xl

          bg-white
          dark:bg-zinc-950

          rounded-none
          md:rounded-[32px]

          overflow-hidden
          "
        >

          {/* Search Header */}

          <div
            className="
            sticky
            top-0
            z-20

            flex
            items-center

            gap-4

            p-4
            md:p-6

            border-b
            border-zinc-200
            dark:border-zinc-800
            "
          >

            <Search
              size={20}
              className="
              flex-shrink-0
              "
            />

            <input

              autoFocus

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }

              placeholder="
              Search shoes, brands, categories...
              "

              className="
              flex-1

              bg-transparent

              outline-none

              text-base
              md:text-lg
              "
            />

            <div
              className="
              hidden
              md:flex

              text-xs

              px-2
              py-1

              rounded-lg

              bg-zinc-100
              dark:bg-zinc-800
              "
            >
              ESC
            </div>

            <button
              onClick={onClose}
              className="
              p-2
              "
            >
              <X />
            </button>

          </div>

          {/* Empty State */}

          {!search && (

            <div
              className="
              p-8
              "
            >

              <h3
                className="
                font-bold
                mb-4
                "
              >
                Trending Searches
              </h3>

              <div
                className="
                flex
                flex-wrap
                gap-3
                "
              >

                {trending.map(
                  (item) => (

                    <button

                      key={item}

                      onClick={() =>
                        setSearch(
                          item
                        )
                      }

                      className="
                      px-3
                      py-2
                      md:px-4

                      rounded-full

                      border

                      hover:bg-black
                      hover:text-white

                      transition
                      "
                    >
                      {item}
                    </button>

                  )
                )}

              </div>

            </div>

          )}

          {/* Results */}

          <div
            className="
            max-h-[calc(100dvh-80px)]
            md:max-h-[70vh]
            overflow-y-auto
            "
          >

            {loading && (

              <div
                className="
                p-10
                text-center
                "
              >
                Searching...
              </div>

            )}

            {!loading &&
              products.length === 0 &&
              search && (

              <div
                className="
                p-6
                md:p-12
                text-center
                "
              >

                <Search
                  size={48}
                  className="
                  mx-auto
                  mb-4

                  text-zinc-400
                  "
                />

                <h3
                  className="
                  text-xl
                  font-semibold
                  "
                >
                  No products found
                </h3>

              </div>

            )}

            {products.map(
              (product: any) => (

                <Link

                  key={product._id}

                  to={`/products/${product.slug}`}

                  onClick={onClose}

                  className="
                  flex
                  items-center

                  gap-5

                  p-3
                  md:p-5

                  hover:bg-zinc-50
                  dark:hover:bg-zinc-900

                  transition-all
                  "
                >

                  <img

                    src={
                      product.images?.[0]
                        ?.url
                    }

                    alt=""

                    className="
                    w-16
                    h-16

                    md:w-24
                    md:h-24

                    rounded-2xl

                    object-cover
                    "
                  />

                  <div
                    className="
                    flex-1
                    "
                  >

                    <h3
                      className="
                      font-semibold
                      text-sm
                      md:text-lg
                      "
                    >
                      {product.name}
                    </h3>

                    <p
                      className="
                      text-zinc-500
                      "
                    >
                      ₹
                      {
                        product.discountPrice ||
                        product.price
                      }
                    </p>

                  </div>

                  <ArrowUpRight
                    size={18}
                  />

                </Link>

              )
            )}

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

}