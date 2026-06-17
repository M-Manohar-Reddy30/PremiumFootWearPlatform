import {
  X,
  Heart,
} from "lucide-react";

import {
  useWishlist,
} from "../../providers/WishlistProvider";

import {
  useCart,
} from "../../providers/CartProvider";

import {
  useState,
} from "react";

export default function QuickViewModal({
  product,
  open,
  onClose,
}:any){

  const {
    toggleWishlist,
    wishlistIds,
  } =
  useWishlist();

  const {
    addItem,
  } =
  useCart();

  const [size,
  setSize] =
  useState("");

  const [color,
  setColor] =
  useState("");

  if(
    !open ||
    !product
  ){
    return null;
  }

  const isWishlisted =
  wishlistIds.includes(
    product._id
  );

  return (

    <div
        className="
        fixed
        inset-0

        z-[9999]

        bg-black/60

        backdrop-blur-md

        flex
        items-center
        justify-center
        "
    >

        <div

            onClick={(e)=>
            e.stopPropagation()
           }
            className="
            bg-white
            dark:bg-zinc-900

            rounded-3xl

            max-w-5xl
            w-full

            overflow-hidden

            relative
            "
        >

        <button

            onClick={onClose}

            className="
            absolute
            top-4
            right-4
            z-20

            bg-white
            dark:bg-zinc-800

            p-2

            rounded-full

            shadow
            "
        >
            <X size={20} />
        </button>

        <div
          className="
          grid
          md:grid-cols-2
          "
        >

          <img
            src={
              product.images?.[0]?.url
            }
            alt=""
            className="
            w-full
            h-full

            object-cover
            "
          />

          <div
            className="
            p-8
            "
          >

            <h2
              className="
              text-3xl
              font-bold
              "
            >
              {product.name}
            </h2>

            <p
              className="
              mt-4
              text-zinc-500
              "
            >
              {
                product.description
              }
            </p>

            <div
              className="
              mt-6
              text-3xl
              font-bold
              "
            >
              ₹
              {
                product.discountPrice ||
                product.price
              }
            </div>

            {product.sizes?.length > 0 && (

              <div
                className="
                mt-6
                "
              >

                <h3>
                  Size
                </h3>

                <div
                  className="
                  flex
                  gap-2
                  mt-2
                  "
                >

                  {product.sizes.map(
                    (item:string)=>(
                      <button

                        key={item}

                        onClick={()=>
                          setSize(item)
                        }

                        className={`
                        px-4
                        py-2
                        border
                        rounded-xl

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

            {product.colors?.length > 0 && (

              <div
                className="
                mt-6
                "
              >

                <h3>
                  Color
                </h3>

                <div
                  className="
                  flex
                  gap-2
                  mt-2
                  "
                >

                  {product.colors.map(
                    (item:string)=>(
                      <button

                        key={item}

                        onClick={()=>
                          setColor(item)
                        }

                        className={`
                        px-4
                        py-2
                        border
                        rounded-xl

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

            <div
              className="
              flex
              gap-4

              mt-8
              "
            >

              <button

                onClick={()=>
                  addItem(
                    product._id,
                    1,
                    size,
                    color
                  )
                }

                className="
                flex-1

                bg-black
                text-white

                py-4

                rounded-xl
                "
              >
                Add To Cart
              </button>

              <button

                onClick={()=>
                  toggleWishlist(
                    product._id
                  )
                }

                className="
                border

                px-5

                rounded-xl
                "
              >

                <Heart
                  fill={
                    isWishlisted
                    ? "currentColor"
                    : "none"
                  }
                />

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}