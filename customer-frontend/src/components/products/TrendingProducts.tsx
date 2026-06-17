import { useSelector } from "react-redux";
import { useRef } from "react";

import useGSAPReveal from "../../hooks/useGSAPReveal";

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
    >

      <ProductSection
        title="Trending Now"
        products={trending}
      />

    </section>

  );

}