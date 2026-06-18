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

        px-4
        pt-20
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
          max-w-4xl

          bg-white
          dark:bg-zinc-950

          rounded-[32px]

          overflow-hidden

          shadow-[0_25px_80px_rgba(0,0,0,0.4)]
          "
        >

          {/* Search Header */}

          <div
            className="
            flex
            items-center

            gap-4

            p-6

            border-b
            border-zinc-200
            dark:border-zinc-800
            "
          >

            <Search
              size={24}
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

              text-lg
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
                      px-4
                      py-2

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
            max-h-[70vh]
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
                p-12
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

                  p-5

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
                    w-24
                    h-24

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
                      text-lg
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