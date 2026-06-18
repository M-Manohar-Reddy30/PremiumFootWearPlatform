import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import ImageLightbox
from "../components/products/ImageLightbox";

import MainLayout
from "../layouts/MainLayout";

import {
  getProductBySlug
} from "../api/productApi";

import {
  useWishlist
} from "../providers/WishlistProvider";

import RelatedProducts
from "../components/products/RelatedProducts";

import ReviewsSection
from "../components/reviews/ReviewsSection";

import useRecentlyViewed
from "../hooks/useRecentlyViewed";

import RecentlyViewed
from "../components/products/RecentlyViewed";

import {
  useCart
} from "../providers/CartProvider";

import ShareProduct
from "../components/products/ShareProduct";

import YouMayAlsoLike
from "../components/products/YouMayAlsoLike";

export default function ProductDetailsPage() {

  const { slug } =
  useParams();

  const [product,setProduct] =
  useState<any>(null);

  const [loading,setLoading] =
  useState(true);

  const [selectedImage,setSelectedImage] =
  useState(0);

  const [zoomStyle,
  setZoomStyle] =
  useState({});

  const {
    wishlistIds,
    toggleWishlist,
  } =
  useWishlist();

  const {
    addItem,
    loading:cartLoading,
  } =
  useCart();

  const [selectedSize,
  setSelectedSize] =
  useState("");

  const [selectedColor,
  setSelectedColor] =
  useState("");

  const isWishlisted =
  wishlistIds.includes(
    product?._id
  );

  const {
      addProduct,
    } =
    useRecentlyViewed();

  const [lightboxOpen,
  setLightboxOpen] =
  useState(false);

  useEffect(()=>{

    const loadProduct =
    async()=>{

      try{

        const res =
        await getProductBySlug(
          slug!
        );

        const productData =
      res.data.product;

      setProduct(
        productData
      );

      addProduct(
        productData
      );

      }
      catch(error){

        console.error(error);

      }
      finally{

        setLoading(false);

      }

    };

    loadProduct();

  },[slug]);

  if(loading){

    return (
      <MainLayout>
        <div className="p-20">
          Loading...
        </div>
      </MainLayout>
    );

  }

  if(!product){

    return (
      <MainLayout>
        <div className="p-20">
          Product Not Found
        </div>
      </MainLayout>
    );

  }

  return (

    <MainLayout>

      <div className="pb-24 md:pb-0">

      <div
        className="
        max-w-[1600px]
        mx-auto

        px-4
        md:px-8
        xl:px-12

        py-8
        md:py-16

        grid
        lg:grid-cols-2

        gap-10
        lg:gap-20
        "
      >

        {/* Image Gallery */}

        <div>

            <div
              className="
              relative

              overflow-hidden

              rounded-3xl

              cursor-zoom-in
              "
            >

              {/* Low Stock Badge */}

              {product.stock <= 5 && (

                <div
                  className="
                  absolute
                  top-4
                  left-4

                  z-20

                  bg-red-500
                  text-white

                  px-4
                  py-2

                  rounded-full

                  text-sm
                  font-semibold
                  "
                >

                  Only {product.stock} Left

                </div>

              )}

              <img

                src={
                  product.images?.[
                    selectedImage
                  ]?.url
                }

                alt={
                  product.name
                }

                onClick={() =>
                  setLightboxOpen(true)
                }

                onMouseMove={(e)=>{

                  const {
                    left,
                    top,
                    width,
                    height,
                  } =
                  e.currentTarget
                  .getBoundingClientRect();

                  const x =
                  (
                    (e.clientX - left)
                    / width
                  ) * 100;

                  const y =
                  (
                    (e.clientY - top)
                    / height
                  ) * 100;

                  setZoomStyle({

                    transform:
                    "scale(2)",

                    transformOrigin:
                    `${x}% ${y}%`

                  });

                }}

                onMouseLeave={()=>{

                  setZoomStyle({

                    transform:
                    "scale(1)",

                    transformOrigin:
                    "center"

                  });

                }}

                style={zoomStyle}

                className="
                w-full
                aspect-square

                object-cover

                rounded-[32px]

                shadow-2xl

                cursor-zoom-in

                transition-transform
                duration-200
                "
              />

            </div>

            <div
                className="
                flex
                gap-3

                mt-4

                overflow-x-auto
                "
            >

                {product.images?.map(
                (
                    image:any,
                    index:number
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
                    w-24
                    h-24

                    md:w-28
                    md:h-28

                    object-cover

                    rounded-2xl

                    cursor-pointer

                    border-2

                    transition-all
                    duration-300

                    hover:scale-105

                    ${
                      selectedImage === index
                      ? "border-black shadow-lg"
                      : "border-transparent"
                    }
                    `}
                 />

                )
                )}

            </div>

        </div>

        {/* Info */}

        <div>

          <h1
            className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            xl:text-6xl

            font-black

            tracking-tight

            leading-none
            "
          >
            {product.name}
          </h1>

            <div
              className="
              mt-4
              inline-flex

              items-center

              px-4
              py-2

              rounded-full

              bg-zinc-100
              dark:bg-zinc-800

              text-sm
              font-medium
              "
            >
              Category:
              {" "}
              {product.category?.name}
            </div>

            <p
                className="
                mt-4

                text-zinc-500
                "
            >
                {product.description}
            </p>

            <div
              className="
              mt-8

              flex
              flex-wrap

              items-center

              gap-5
              "
            >

                <span
                className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-bold
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
                    line-through
                    text-zinc-400
                    "
                >
                    ₹
                    {product.price}
                </span>

                )}

            </div>

            {product.discountPrice && (

              <div
                className="
                inline-flex

                mt-4

                bg-green-100
                text-green-700

                px-4
                py-2

                rounded-full

                font-semibold
                "
              >
                Save ₹{product.price - product.discountPrice}
              </div>

            )}

            <p
                className="
                mt-4

                text-green-600

                font-medium
                "
            >
                In Stock:
                {" "}
                {product.stock}
            </p>

          <div
            className="
            mt-8
            space-y-6
            "
          >

            {/* Sizes */}

            {product.sizes?.length > 0 && (

              <div>

                <h3
                  className="
                  font-semibold
                  mb-3
                  "
                >
                  Sizes
                </h3>

                <div
                  className="
                  flex
                  gap-2
                  flex-wrap
                  "
                >

                  {product.sizes.map(
                    (size:string)=>(
                    <button

                      key={size}

                      onClick={() =>
                        setSelectedSize(
                          size
                        )
                      }

                      className={`
                      border
                      px-4
                      py-2
                      rounded-xl

                      ${
                        selectedSize === size
                        ? "bg-black text-white"
                        : ""
                      }
                      `}
                    >
                      {size}
                    </button>
                    )
                  )}

                </div>

              </div>

            )}

            {/* Colors */}

            {product.colors?.length > 0 && (

              <div>

                <h3
                  className="
                  font-semibold
                  mb-3
                  "
                >
                  Colors
                </h3>

                <div
                  className="
                  flex
                  gap-2
                  flex-wrap
                  "
                >

                  {product.colors.map(
                    (color:string)=>(
                    <button

                      key={color}

                      onClick={() =>
                        setSelectedColor(
                          color
                        )
                      }

                      className={`
                      border
                      px-4
                      py-2
                      rounded-xl

                      ${
                        selectedColor === color
                        ? "bg-black text-white"
                        : ""
                      }
                      `}
                    >
                      {color}
                    </button>
                    )
                  )}

                </div>

              </div>

            )}

            {/* Selected Values */}

            <div
              className="
              text-sm
              text-zinc-500
              "
            >

              Size:
              {" "}
              {selectedSize || "-"}

              {" | "}

              Color:
              {" "}
              {selectedColor || "-"}

            </div>

            {/* Buttons Row */}

            <div
              className="
              flex
              gap-4
              flex-wrap
              "
            >

              <button

                onClick={() => {

                  if(
                    product.sizes?.length > 0 &&
                    !selectedSize
                  ){

                    alert(
                      "Please select a size"
                    );

                    return;

                  }

                  if(
                    product.colors?.length > 0 &&
                    !selectedColor
                  ){

                    alert(
                      "Please select a color"
                    );

                    return;

                  }

                  addItem(

                    product._id,

                    1,

                    selectedSize,

                    selectedColor

                  );

                }}

                disabled={
                  cartLoading
                }

                className="
                bg-black

                hover:bg-zinc-800

                text-white

                w-full
                sm:w-auto

                px-6
                md:px-10

                py-4

                rounded-2xl

                font-semibold

                shadow-xl

                transition-all

                hover:scale-105
                "
              >

                {
                  cartLoading
                  ? "Adding..."
                  : "Add To Cart"
                }

              </button>

              <button

                onClick={() =>
                  toggleWishlist(
                    product._id
                  )
                }

                className="
                border-2

                border-black

                w-full
                sm:w-auto

                px-6
                md:px-10

                py-4

                rounded-2xl

                font-semibold

                hover:bg-black
                hover:text-white

                transition-all
                "
              >

                {
                  isWishlisted
                  ? "Wishlisted ❤️"
                  : "Wishlist 🤍"
                }

              </button>

            </div>

            <ShareProduct
              product={product}
            />

            <div
              className="
              border
              rounded-2xl

              p-5

              space-y-4

              bg-gradient-to-br
              from-zinc-50
              to-white

              dark:from-zinc-900
              dark:to-zinc-950

              shadow-xl
              border-0
              dark:bg-zinc-900
              "
            >

              <div
                className="
                flex
                items-center
                gap-3
                "
              >
                <span>✓</span>

                <span>
                  100% Original Product
                </span>
              </div>

              <div
                className="
                flex
                items-center
                gap-3
                "
              >
                <span>🚚</span>

                <span>
                  Fast Delivery (3-7 Days)
                </span>
              </div>

              <div
                className="
                flex
                items-center
                gap-3
                "
              >
                <span>🔄</span>

                <span>
                  Easy 7-Day Returns
                </span>
              </div>

              <div
                className="
                flex
                items-center
                gap-3
                "
              >
                <span>🔒</span>

                <span>
                  Secure Payments
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

     <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >

        <RelatedProducts

          categoryId={
            product.category?._id
          }

          currentProductId={
            product._id
          }

        />

      </div>

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >

        <RecentlyViewed
          currentProductId={
            product._id
          }
        />

      </div>

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >

        <YouMayAlsoLike
          currentProductId={
            product._id
          }
        />

      </div>

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >

        <ReviewsSection
          product={product}
        />

      </div>

      <ImageLightbox

        images={
          product.images
        }

        selectedIndex={
          selectedImage
        }

        setSelectedIndex={
          setSelectedImage
        }

        open={
          lightboxOpen
        }

        onClose={() =>
          setLightboxOpen(false)
        }
      />

      <ImageLightbox

  images={
    product.images
  }

  selectedIndex={
    selectedImage
  }

  setSelectedIndex={
    setSelectedImage
  }

  open={
    lightboxOpen
  }

  onClose={() =>
    setLightboxOpen(false)
  }
/>

    {/* Mobile Sticky Cart */}

    <div
      className="
      fixed
      bottom-0
      left-0
      right-0

      z-50

      bg-white
      dark:bg-zinc-950

      border-t

      p-4

      md:hidden
      "
    >

      <button

        onClick={() => {

          addItem(
            product._id,
            1,
            selectedSize,
            selectedColor
          );

        }}

        className="
        w-full

        bg-black
        text-white

        py-4

        rounded-xl

        font-semibold
        "
      >

        Add To Cart

      </button>

    </div>

    </div>

    </MainLayout>

  );

}