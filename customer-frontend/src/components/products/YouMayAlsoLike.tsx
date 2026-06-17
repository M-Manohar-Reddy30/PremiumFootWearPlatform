import {
  useEffect,
  useState,
} from "react";

import {
  getProducts,
} from "../../api/productApi";

import ProductCard
from "./ProductCard";

export default function YouMayAlsoLike({
  currentProductId,
}:any){

  const [products,
  setProducts] =
  useState<any[]>([]);

  useEffect(()=>{

    loadProducts();

  },[]);

  const loadProducts =
  async()=>{

    try{

      const res =
      await getProducts({
        trending:true,
        limit:8,
      });

      const filtered =
      res.data.products.filter(
        (product:any)=>
        product._id !==
        currentProductId
      );

      setProducts(
        filtered.slice(0,4)
      );

    }
    catch(error){

      console.error(error);

    }

  };

  if(!products.length)
    return null;

  return (

    <section
      className="
      mt-20
      "
    >

      <h2
        className="
        text-3xl
        font-bold

        mb-8
        "
      >
        You May Also Like
      </h2>

      <div
        className="
        grid

        md:grid-cols-2
        lg:grid-cols-4

        gap-6
        "
      >

        {products.map(
          (product:any)=>(

            <ProductCard
              key={product._id}
              product={product}
            />

          )
        )}

      </div>

    </section>

  );

}