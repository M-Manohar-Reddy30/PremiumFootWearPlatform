import {
  useEffect,
  useState,
} from "react";

import ProductCard
from "./ProductCard";

import useRecentlyViewed
from "../../hooks/useRecentlyViewed";

interface Props {
  currentProductId: string;
}

export default function RecentlyViewed({
  currentProductId,
}: Props) {

  const {
    getProducts,
  } =
  useRecentlyViewed();

  const [products,
  setProducts] =
  useState<any[]>([]);

  useEffect(() => {

    const viewedProducts =
    getProducts().filter(
      (product:any) =>
        product._id !==
        currentProductId
    );

    setProducts(
      viewedProducts
    );

  }, [
    currentProductId
  ]);

  if (
    products.length === 0
  ) {
    return null;
  }

  return (

    <section
      className="
      mt-24
      "
    >

      <div
        className="
        flex
        items-center
        justify-between

        mb-8
        "
      >

        <h2
          className="
          text-3xl
          font-bold
          "
        >
          Recently Viewed
        </h2>

        <span
          className="
          text-sm
          text-zinc-500
          "
        >
          {products.length}
          {" "}
          Products
        </span>

      </div>

      <div
        className="
        grid

        md:grid-cols-2
        lg:grid-cols-4

        gap-6
        "
      >

        {products.map(
          (product:any) => (

            <ProductCard
              key={
                product._id
              }
              product={product}
            />

          )
        )}

      </div>

    </section>

  );

}