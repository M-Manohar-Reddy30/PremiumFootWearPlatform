import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";

import {
  useWishlist,
} from "../../providers/WishlistProvider";

export default function ProductCard({
  product,
  onQuickView,
}: any) {

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

  const {
    wishlistIds,
    toggleWishlist,
  } = useWishlist();

  const isWishlisted =
    wishlistIds.includes(
      product._id
    );

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

      bg-white
      dark:bg-zinc-900

      rounded-[30px]

      overflow-hidden

      border
      border-zinc-200
      dark:border-zinc-800

      shadow-sm
      hover:shadow-2xl

      transition-all
      duration-500
      "
    >

      <Link
        to={`/products/${product.slug}`}
      >

        {/* Image Section */}

        <div
          className="
          relative

          aspect-square

          overflow-hidden
          "
        >

          {/* Discount */}

          {discount > 0 && (

            <div
              className="
              absolute

              top-4
              left-4

              z-20

              bg-red-600

              text-white

              px-3
              py-1

              rounded-full

              text-xs
              font-bold
              "
            >
              {discount}% OFF
            </div>

          )}

          {/* Featured Badge */}

          {product.featured && (

            <div
              className="
              absolute

              top-4
              left-24

              z-20

              bg-black

              text-white

              px-3
              py-1

              rounded-full

              text-xs
              "
            >
              BESTSELLER
            </div>

          )}

          {/* Wishlist */}

          <button

            onClick={(e)=>{

              e.preventDefault();
              e.stopPropagation();

              toggleWishlist(
                product._id
              );

            }}

            className="
            absolute

            top-4
            right-4

            z-30

            p-2

            rounded-full

            bg-white/90

            backdrop-blur-md

            hover:scale-110

            transition
            "
          >

            <Heart

              size={18}

              fill={
                isWishlisted
                  ? "currentColor"
                  : "none"
              }

              className={
                isWishlisted
                  ? "text-red-500"
                  : "text-black"
              }

            />

          </button>

          {/* Image */}

          <img
            src={
              product.images?.[0]?.url
            }
            alt={product.name}
            className="
            w-full
            h-full

            object-cover

            transition-transform
            duration-700

            group-hover:scale-110
            "
          />

          {/* Overlay */}

          <div
            className="
            absolute
            inset-0

            bg-gradient-to-t

            from-black/20
            to-transparent

            opacity-0

            group-hover:opacity-100

            transition-all
            duration-500
            "
          />

          {/* Quick View */}

          <div
            className="
            absolute

            bottom-5
            left-1/2

            -translate-x-1/2

            opacity-0

            group-hover:opacity-100

            transition-all
            duration-300

            z-30
            "
          >

            <button

              onClick={(e)=>{

                e.preventDefault();
                e.stopPropagation();

                onQuickView?.(
                  product
                );

              }}

              className="
              bg-white

              text-black

              px-5
              py-2

              rounded-full

              text-sm
              font-medium

              shadow-lg
              "
            >
              Quick View
            </button>

          </div>

        </div>

        {/* Content */}

        <div
          className="
          p-5
          "
        >

          {/* Rating */}

          <div
            className="
            flex
            items-center

            gap-1

            mb-3
            "
          >

            <Star
              size={14}
              fill="currentColor"
              className="text-yellow-500"
            />

            <span
              className="
              text-sm
              font-medium
              "
            >
              4.8
            </span>

            <span
              className="
              text-xs
              text-zinc-500
              "
            >
              (124)
            </span>

          </div>

          {/* Name */}

          <h3
            className="
            text-lg

            font-bold

            mb-2

            line-clamp-1
            "
          >
            {product.name}
          </h3>

          {/* Description */}

          <p
            className="
            text-sm

            text-zinc-500

            line-clamp-2

            mb-4
            "
          >
            {product.description}
          </p>

          {/* Price */}

          <div
            className="
            flex
            items-center

            gap-3
            "
          >

            <span
              className="
              text-2xl

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
                text-zinc-400

                line-through
                "
              >
                ₹
                {product.price}
              </span>

            )}

          </div>

        </div>

      </Link>

    </motion.div>

  );

}