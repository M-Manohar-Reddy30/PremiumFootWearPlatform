import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  X,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  getProducts,
} from "../../api/productApi";

export default function SearchModal({
  open,
  onClose,
}:any){

  const [search,
  setSearch] =
  useState("");

  const [products,
  setProducts] =
  useState<any[]>([]);

  const [loading,
  setLoading] =
  useState(false);

  useEffect(()=>{

    if(!search.trim()){

      setProducts([]);

      return;

    }

    const timeout =
    setTimeout(async()=>{

      try{

        setLoading(true);

        const res =
        await getProducts({

          search,

          limit:8,

        });

        setProducts(
          res.data.products || []
        );

      }
      catch(error){

        console.error(error);

      }
      finally{

        setLoading(false);

      }

    },300);

    return ()=>clearTimeout(timeout);

  },[search]);

  useEffect(()=>{

    const handleEsc =
    (e:KeyboardEvent)=>{

      if(e.key==="Escape"){

        onClose();

      }

    };

    window.addEventListener(
      "keydown",
      handleEsc
    );

    return ()=>{

      window.removeEventListener(
        "keydown",
        handleEsc
      );

    };

  },[]);

  if(!open){

    return null;

  }

  return (

    <div

      onClick={onClose}

      className="
      fixed
      inset-0

      z-[9999]

      bg-black/50

      backdrop-blur-md

      flex
      justify-center

      pt-24
      "
    >

      <div

        onClick={(e)=>
          e.stopPropagation()
        }

        className="
        bg-white
        dark:bg-zinc-900

        w-full
        max-w-2xl

        rounded-3xl

        h-fit

        shadow-2xl

        overflow-hidden
        "
      >

        {/* Header */}

        <div
          className="
          flex
          items-center

          gap-3

          p-5

          border-b
          "
        >

          <Search size={20} />

          <input

            autoFocus

            value={search}

            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }

            placeholder="
            Search shoes...
            "

            className="
            flex-1

            outline-none

            bg-transparent
            "
          />

          <button
            onClick={onClose}
          >
            <X />
          </button>

        </div>

        {/* Results */}

        <div
          className="
          max-h-[500px]
          overflow-y-auto
          "
        >

          {loading && (

            <div
              className="
              p-6
              "
            >
              Searching...
            </div>

          )}

          {!loading &&
          products.length === 0 &&
          search && (

            <div
              className="
              p-6

              text-zinc-500
              "
            >
              No products found
            </div>

          )}

          {products.map(
            (product:any)=>(

              <Link

                key={product._id}

                to={`/products/${product.slug}`}

                onClick={onClose}

                className="
                flex

                gap-4

                p-4

                hover:bg-zinc-100
                dark:hover:bg-zinc-800

                transition
                "
              >

                <img
                  src={
                    product.images?.[0]
                    ?.url
                  }
                  alt=""
                  className="
                  w-20
                  h-20

                  object-cover

                  rounded-xl
                  "
                />

                <div>

                  <h3
                    className="
                    font-semibold
                    "
                  >
                    {product.name}
                  </h3>

                  <p
                    className="
                    text-zinc-500
                    text-sm
                    "
                  >
                    ₹
                    {
                      product.discountPrice ||
                      product.price
                    }
                  </p>

                </div>

              </Link>

            )
          )}

        </div>

      </div>

    </div>

  );

}