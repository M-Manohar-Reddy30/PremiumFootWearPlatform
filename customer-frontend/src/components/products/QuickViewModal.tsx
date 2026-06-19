import {
  useState,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";

import {
  useWishlist,
} from "../../providers/WishlistProvider";

import {
  useCart,
} from "../../providers/CartProvider";

export default function QuickViewModal({
  product,
  open,
  onClose,
}: any) {

  const {
    wishlistIds,
    toggleWishlist,
  } = useWishlist();

  const {
    addItem,
  } = useCart();

  const [size, setSize] =
    useState("");

  const [color, setColor] =
    useState("");

  const [selectedImage,
  setSelectedImage] =
    useState(0);

  useEffect(() => {

    if(open){

      document.body.style.overflow =
      "hidden";

    }
    else{

      document.body.style.overflow =
      "auto";

    }

    return () => {

      document.body.style.overflow =
      "auto";

    };

  }, [open]);

  if (!open || !product)
    return null;

  const isWishlisted =
    wishlistIds.includes(
      product._id
    );

  const discount =
    product.discountPrice
      ? Math.round(
          (
            (
              product.price -
              product.discountPrice
            ) /
            product.price
          ) * 100
        )
      : 0;

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

        backdrop-blur-lg

        flex

        items-end
        md:items-center

        justify-center

        p-0
        md:p-4
        "
      >

        <motion.div

          initial={{
            opacity: 0,
            scale: 0.9,
            y: 50,
          }}

          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}

          exit={{
            opacity: 0,
            scale: 0.9,
          }}

          transition={{
            duration: 0.35,
          }}

          onClick={(e) =>
            e.stopPropagation()
          }

          className="
          relative

          w-full
          max-w-6xl

          max-h-[100vh]
          md:max-h-[90vh]

          overflow-y-auto

          rounded-t-3xl
          md:rounded-[36px]
          
          bg-white
          dark:bg-zinc-950

          shadow-2xl
          "
        >

          {/* Close */}

          <button

            onClick={onClose}

            className="
            absolute

            top-3
            right-3

            md:top-5
            md:right-5

            z-50

            p-3

            rounded-full

            bg-white
            dark:bg-zinc-900

            shadow-lg
            "
          >

            <X size={20} />

          </button>

          <div
            className="
            grid

            lg:grid-cols-2
            "
          >

            {/* Images */}

            <div
              className="
              p-4
              md:p-6
              "
            >

              <div
                className="
                overflow-hidden

                rounded-[28px]
                "
              >

                <img

                  src={
                    product.images?.[
                      selectedImage
                    ]?.url
                  }

                  alt={product.name}

                  className="
                  w-full

                  aspect-square

                  object-cover
                  "
                />

              </div>

              <div
                className="
                flex

                gap-3

                mt-4

               overflow-x-auto
                scrollbar-hide
                pb-2
                "
              >

                {product.images?.map(
                  (
                    image: any,
                    index: number
                  ) => (

                    <img

                      key={index}

                      src={image.url}

                      alt=""

                      onClick={() =>
                        setSelectedImage(
                          index
                        )
                      }

                      className={`
                      w-14
                      h-14

                      md:w-20
                      md:h-20

                      rounded-2xl

                      object-cover

                      cursor-pointer

                      border-2

                      ${
                        selectedImage ===
                        index
                          ? "border-black"
                          : "border-transparent"
                      }
                      `}
                    />

                  )
                )}

              </div>

            </div>

            {/* Info */}

            <div
              className="
              p-6
              md:p-10
              "
            >

              <div
                className="
                flex
                items-center
                gap-3

                mb-4
                "
              >

                {discount > 0 && (

                  <span
                    className="
                    bg-red-500

                    text-white

                    px-3
                    py-1

                    rounded-full

                    text-xs
                    font-bold
                    "
                  >
                    {discount}% OFF
                  </span>

                )}

                {product.featured && (

                  <span
                    className="
                    bg-black

                    text-white

                    px-3
                    py-1

                    rounded-full

                    text-xs
                    "
                  >
                    BESTSELLER
                  </span>

                )}

              </div>

              <h2
                className="
                text-xl
                sm:text-2xl
                md:text-4xl
                font-black

                leading-tight
                "
              >
                {product.name}
              </h2>

              <div
                className="
                flex
                items-center

                gap-2

                mt-4
                "
              >

                <Star
                  size={16}
                  fill="currentColor"
                  className="
                  text-yellow-500
                  "
                />

                <span>
                  4.8
                </span>

                <span
                  className="
                  text-zinc-500
                  "
                >
                  (124 Reviews)
                </span>

              </div>

              <p
                className="
                mt-6

                text-zinc-600
                dark:text-zinc-400

                leading-6
                md:leading-relaxed
                "
              >
                {product.description}
              </p>

              {/* Price */}

              <div
                className="
                flex
                items-center

                gap-4

                mt-8
                "
              >

                <span
                  className="
                  text-xl
                  sm:text-2xl
                  md:text-4xl

                  font-black
                  "
                >
                  ₹
                  {
                    product.discountPrice ||
                    product.price
                  }
                </span>

                {product.discountPrice && (

                  <span
                    className="
                    text-xl

                    line-through

                    text-zinc-400
                    "
                  >
                    ₹{product.price}
                  </span>

                )}

              </div>

              <p
                className="
                mt-3

                text-green-600

                font-medium
                "
              >
                {product.stock}
                items in stock
              </p>

              {/* Sizes */}

              {product.sizes?.length > 0 && (

                <div className="mt-8">

                  <h3
                    className="
                    font-semibold
                    mb-3
                    "
                  >
                    Select Size
                  </h3>

                  <div
                    className="
                    flex
                    flex-wrap
                    gap-2
                    "
                  >

                    {product.sizes.map(
                      (item: string) => (

                        <button

                          key={item}

                          onClick={() =>
                            setSize(item)
                          }

                          className={`
                          px-4
                          py-2

                          rounded-xl

                          border

                          transition

                          ${
                            size === item
                              ? "bg-black text-white"
                              : ""
                          }
                          `}
                        >
                          {item}
                        </button>

                      )
                    )}

                  </div>

                </div>

              )}

              {/* Colors */}

              {product.colors?.length > 0 && (

                <div className="mt-8">

                  <h3
                    className="
                    font-semibold
                    mb-3
                    "
                  >
                    Select Color
                  </h3>

                  <div
                    className="
                    flex
                    flex-wrap
                    gap-2
                    "
                  >

                    {product.colors.map(
                      (item: string) => (

                        <button

                          key={item}

                          onClick={() =>
                            setColor(item)
                          }

                          className={`
                          px-4
                          py-2

                          rounded-xl

                          border

                          transition

                          ${
                            color === item
                              ? "bg-black text-white"
                              : ""
                          }
                          `}
                        >
                          {item}
                        </button>

                      )
                    )}

                  </div>

                </div>

              )}

              {/* Actions */}

              <div
                className="
                flex
                flex-col
                sm:flex-row

                gap-3

                mt-8
                "
              >

                <button

                  onClick={() =>
                    addItem(
                      product._id,
                      1,
                      size,
                      color
                    )
                  }

                  className="
                  flex-1

                  items-end
                  md:items-center

                  justify-center

                  gap-2

                  bg-black

                  text-white

                  py-4

                  rounded-2xl

                  font-semibold
                  "
                >

                  <ShoppingBag
                    size={18}
                  />

                  Add To Cart

                </button>

                <button

                  onClick={() =>
                    toggleWishlist(
                      product._id
                    )
                  }

                  className="
                  w-full
                  sm:w-16

                  h-14
                  sm:h-auto

                  rounded-2xl

                  border

                  flex
                  items-center
                  justify-center
                  "
                >

                  <Heart

                    fill={
                      isWishlisted
                        ? "currentColor"
                        : "none"
                    }

                    className={
                      isWishlisted
                        ? "text-red-500"
                        : ""
                    }
                  />

                </button>

              </div>

            </div>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

}