import { useSelector } from "react-redux";
import { useRef } from "react";

import useGSAPReveal from "../../hooks/useGSAPReveal";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {

  const featured =
  useSelector(
    (state:any)=>
    state.home.featured
  );

  const sectionRef =
  useRef<HTMLElement>(null);

  useGSAPReveal(
    sectionRef
  );

  if (!featured?.length)
    return null;

  return (

    <section
      ref={sectionRef}
      className="
      py-20
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >

        <h2
          className="
          text-4xl
          font-bold
          mb-12
          "
        >
          Featured Collection
        </h2>

        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-6
          "
        >

          {featured.map(
            (product:any)=>(
              <ProductCard
                key={product._id}
                product={product}
              />
            )
          )}

        </div>

      </div>

    </section>

  );

}