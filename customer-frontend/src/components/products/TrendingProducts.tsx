import { useSelector } from "react-redux";
import { useRef } from "react";

import useGSAPReveal
from "../../hooks/useGSAPReveal";

import ProductSection
from "./ProductSection";

export default function TrendingProducts() {

  const trending =
  useSelector(
    (state:any)=>
    state.home.trending
  );

  const sectionRef =
  useRef<HTMLElement>(null);

  useGSAPReveal(
    sectionRef
  );

  if (!trending?.length)
    return null;

  return (

    <section
      ref={sectionRef}
      className="
      relative

      py-8
      md:py-16

      overflow-hidden
      "
    >

      {/* Desktop Glow */}

      <div
        className="
        hidden md:block

        absolute

        top-0
        right-0

        w-[500px]
        h-[500px]

        rounded-full

        bg-zinc-200/20
        dark:bg-zinc-800/10

        blur-[120px]

        pointer-events-none
        "
      />

      <div
        className="
        max-w-7xl
        mx-auto

        px-4
        sm:px-5
        md:px-6

        relative
        z-10
        "
      >

        <ProductSection

          title="Trending Now"

          products={trending}

        />

      </div>

    </section>

  );

}