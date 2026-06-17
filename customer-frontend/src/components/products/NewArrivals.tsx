import { useSelector } from "react-redux";
import { useRef } from "react";

import useGSAPReveal from "../../hooks/useGSAPReveal";

import ProductSection
from "./ProductSection";

export default function NewArrivals() {

  const arrivals =
  useSelector(
    (state:any)=>
    state.home.arrivals
  );

  const sectionRef =
  useRef<HTMLElement>(null);

  useGSAPReveal(
    sectionRef
  );

  if (!arrivals?.length)
    return null;

  return (

    <section
      ref={sectionRef}
    >

      <ProductSection
        title="New Arrivals"
        products={arrivals}
      />

    </section>

  );

}