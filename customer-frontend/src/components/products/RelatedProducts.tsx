import {
  useEffect,
  useState,
} from "react";

import {
  getRelatedProducts,
} from "../../api/productApi";

import ProductCard
from "./ProductCard";

export default function RelatedProducts({
  categoryId,
  currentProductId,
}:any) {

  const [products,setProducts] =
  useState<any[]>([]);

  useEffect(()=>{

    const loadProducts =
    async()=>{

      try{

        const res =
        await getRelatedProducts(
          categoryId
        );

        const filtered =
        res.data.products.filter(
          (product:any)=>
            product._id !==
            currentProductId
        );

        setProducts(
          filtered
        );

      }
      catch(error){

        console.error(error);

      }

    };

    if(categoryId){

      loadProducts();

    }

  },[
    categoryId,
    currentProductId
  ]);

  if(!products.length)
    return null;

  return (

    <section
      className="
      mt-24
      "
    >

      <h2
        className="
        text-3xl
        font-bold

        mb-8
        "
      >
        Related Products
      </h2>

      <div
        className="
        grid

        grid-cols-2
        md:grid-cols-4

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