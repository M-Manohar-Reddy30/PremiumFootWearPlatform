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
        y:-4
      }}

      transition={{
        duration: 0.3,
      }}

      className="
      group

      bg-white
      dark:bg-zinc-900

      rounded-2xl

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

          aspect-[1/1]
          md:aspect-square

          overflow-hidden
          "
        >

          {/* Discount */}

          {discount > 0 && (

            <div
              className="
              absolute

              top-2
              left-2

              z-20

              bg-red-600

              text-white

              px-2
              py-0.5

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

              top-10
              left-2

              z-20

              bg-black

              text-white

              px-2
              py-0.5

              rounded-full

              text-[10px]
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

            top-2
            right-2

            z-30

            p-1.5

            rounded-full

            bg-white/90

            backdrop-blur-md

            hover:scale-110

            transition
            "
          >

            <Heart

              size={16}

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
            loading="lazy"
            src={
              product.images?.[0]?.url ||
              "/placeholder-shoe.png"
            }
            alt={product.name}
            className="
            w-full
            h-full

           object-contain
           bg-zinc-50
           dark:bg-zinc-800

            transition-transform
            duration-700

            group-hover:scale-105
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
            hidden
            lg:block

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
          p-3
          md:p-4
          "
        >

          {/* Rating */}

          <div
            className="
            flex
            items-center

            gap-1

            mb-2
            "
          >

           <div
              className="
              flex
              items-center
              gap-1
              "
            >

              <Star
                size={12}
                fill="currentColor"
                className="text-yellow-500"
              />

              <span
                className="
                text-xs
                font-semibold
                "
              >
                {
                  product.averageRating?.toFixed(1) ||
                  "0.0"
                }
              </span>

              <span
                className="
                text-xs
                text-zinc-500
                "
              >
                (
                {
                  product.reviewCount || 0
                }
                )
              </span>

            </div>

          </div>

          {/* Name */}

          <h3
            className="
            text-sm
            md:text-base

            font-semibold

            mb-2

            line-clamp-2
            min-h-[40px]
            "
          >
            {product.name}
          </h3>

          {/* Description */}

          <p
            className="
            hidden
            md:block

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
            flex-wrap
            gap-2
            "
          >

            <span
              className="
              text-lg
              md:text-xl

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
                text-xs
                text-zinc-400
                line-through
                "
              >
                ₹
                {product.price}
              </span>

            )}

          </div>

          <div
            className="
            mt-1
            text-xs
            font-medium
            "
          >
            {product.stock > 0
            ? (
              <span className="text-green-600">
                In Stock
              </span>
            )
            : (
              <span className="text-red-500">
                Out of Stock
              </span>
            )}
          </div>

        </div>

      </Link>

    </motion.div>

  );

}