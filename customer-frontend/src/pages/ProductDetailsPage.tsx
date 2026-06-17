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
  getProductBySlug,
} from "../api/productApi";

import {
  useWishlist,
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
  useAuth,
} from "@clerk/clerk-react";

import {
  addToWishlist,
} from "../api/wishlistApi";

import {
  useCart,
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

  const { getToken } =
  useAuth();

  const [wishlistLoading,
  setWishlistLoading] =
  useState(false);

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

  const handleWishlist =
  async()=>{

    try{

      setWishlistLoading(true);

      const token =
      await getToken();

      if(!token){

        alert(
          "Please login first"
        );

        return;

      }

      await addToWishlist(
        product._id,
        token
      );

      alert(
        "Added To Wishlist ❤️"
      );

    }
    catch(error:any){

      alert(

        error?.response?.data
        ?.message ||

        "Wishlist Failed"

      );

  }
  finally{

    setWishlistLoading(false);

  }

};

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

      <div
        className="
        max-w-7xl
        mx-auto

        px-6
        py-12

        grid

        md:grid-cols-2

        gap-12
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

                rounded-3xl

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
                    w-20
                    h-20

                    object-cover

                    rounded-xl

                    cursor-pointer

                    border-2

                    ${
                        selectedImage === index
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

        <div>

          <h1
            className="
            text-4xl
            font-bold
            "
          >
            {product.name}
          </h1>

          <p
                className="
                mt-2
                text-zinc-500
                "
            >
                Category:
                {" "}
                {product.category?.name}
           </p>

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
                mt-6

                flex
                items-center
                gap-4
                "
            >

                <span
                className="
                text-3xl
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
                text-white

                px-8
                py-4

                rounded-xl
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
                border

                px-8
                py-4

                rounded-xl
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

              bg-zinc-50
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

    </MainLayout>

  );

}