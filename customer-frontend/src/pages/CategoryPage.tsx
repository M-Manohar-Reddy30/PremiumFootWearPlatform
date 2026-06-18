import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import { motion }
from "framer-motion";

import MainLayout
from "../layouts/MainLayout";

import ProductFilters
from "../components/products/ProductFilters";

import {
  getCategoryProducts,
  getFilterOptions,
} from "../api/categoryApi";

import ProductCard
from "../components/products/ProductCard";

export default function CategoryPage() {

  const { slug } =
  useParams();

  const [loading,setLoading] =
  useState(true);

  const [products,setProducts] =
  useState<any[]>([]);

  const [category,setCategory] =
  useState<any>(null);

  const [search,setSearch] =
  useState("");

  const [sort,setSort] =
  useState("");

  const [selectedSize,
  setSelectedSize] =
  useState("");

  const [selectedColor,
  setSelectedColor] =
  useState("");

  const [selectedBrand,
  setSelectedBrand] =
  useState("");

  const [selectedGender,
  setSelectedGender] =
  useState("");

  const [selectedMaterial,
  setSelectedMaterial] =
  useState("");

  const [selectedOccasion,
  setSelectedOccasion] =
  useState("");

  const [minPrice,
  setMinPrice] =
  useState("");

  const [maxPrice,
  setMaxPrice] =
  useState("");

  const [brands,setBrands] =
  useState<string[]>([]);

  const [genders,setGenders] =
  useState<string[]>([]);

  const [materials,setMaterials] =
  useState<string[]>([]);

  const [occasions,setOccasions] =
  useState<string[]>([]);

  const [sizes,setSizes] =
  useState<string[]>([]);

  const [colors,setColors] =
  useState<string[]>([]);

  useEffect(()=>{

    const loadData =
    async()=>{

      try{

        setLoading(true);

        const res =
        await getCategoryProducts(
          slug!
        );

        setProducts(
          res.data.products || []
        );

        setCategory(
          res.data.category
        );

      }
      catch(error){

        console.error(error);

      }
      finally{

        setLoading(false);

      }

    };

    loadData();

    const loadFilters =
    async()=>{

      try{

        const res =
        await getFilterOptions();

        setBrands(
          res.data.brands || []
        );

        setGenders(
          res.data.genders || []
        );

        setMaterials(
          res.data.materials || []
        );

        setOccasions(
          res.data.occasions || []
        );

        setSizes(
          res.data.sizes || []
        );

        setColors(
          res.data.colors || []
        );

      }
      catch(error){

        console.error(error);

      }

    };

    loadFilters();

  },[slug]);

  const filteredProducts =
  [...products]

  .filter((product:any)=>{

    const matchesSearch =

    product.name
    ?.toLowerCase()
    .includes(
      search.toLowerCase()
    );

    const matchesSize =

    !selectedSize ||

    product.sizes?.includes(
      selectedSize
    );

    const matchesColor =

    !selectedColor ||

    product.colors?.includes(
      selectedColor
    );

    const matchesBrand =

    !selectedBrand ||

    product.brand ===
    selectedBrand;

    const matchesGender =

    !selectedGender ||

    product.gender ===
    selectedGender;

    const matchesMaterial =

    !selectedMaterial ||

    product.material ===
    selectedMaterial;

    const matchesOccasion =

    !selectedOccasion ||

    product.occasion ===
    selectedOccasion;

    const price =

    product.discountPrice ||
    product.price;

    const matchesMin =

    !minPrice ||

    price >=
    Number(minPrice);

    const matchesMax =

    !maxPrice ||

    price <=
    Number(maxPrice);

    return(

      matchesSearch &&
      matchesSize &&
      matchesColor &&
      matchesBrand &&
      matchesGender &&
      matchesMaterial &&
      matchesOccasion &&
      matchesMin &&
      matchesMax

    );

  })

  .sort((a:any,b:any)=>{

    const priceA =
    a.discountPrice ||
    a.price;

    const priceB =
    b.discountPrice ||
    b.price;

    if(sort === "price"){

      return priceA - priceB;

    }

    if(sort === "-price"){

      return priceB - priceA;

    }

    return 0;

  });

  if(loading){

    return(

      <MainLayout>

        <div
          className="
          py-32
          text-center
          "
        >
          Loading...
        </div>

      </MainLayout>

    );

  }

  return(

    <MainLayout>

      {/* Hero Section */}

      <section
        className="
        relative
        h-[550px]
        overflow-hidden
        "
      >

        {/* Background Image */}

        <motion.img

          initial={{
            scale: 1.15
          }}

          animate={{
            scale: 1
          }}

          transition={{
            duration: 8
          }}

          src={category?.image?.url}

          alt={category?.name}

          className="
          absolute
          inset-0

          w-full
          h-full

          object-cover
          "
        />

        {/* Luxury Overlay */}

        <div
          className="
          absolute
          inset-0

          bg-gradient-to-r

          from-black/85
          via-black/55
          to-black/20
          "
        />

        {/* Floating Blur Effect */}

        <div
          className="
          absolute

          top-10
          right-20

          w-72
          h-72

          bg-white/10

          rounded-full

          blur-3xl
          "
        />

        <div
          className="
          absolute

          bottom-10
          left-20

          w-96
          h-96

          bg-white/5

          rounded-full

          blur-3xl
          "
        />

        {/* Content */}

        <div
          className="
          relative
          z-10

          h-full

          flex
          items-center
          "
        >

          <div
            className="
            max-w-7xl
            mx-auto

            px-6
            w-full
            "
          >

            <motion.span

              initial={{
                opacity: 0,
                y: 20
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              className="
              inline-block

              uppercase

              tracking-[5px]

              text-white/70

              text-sm

              mb-4
              "
            >

             Luxury Footwear 2026

            </motion.span>

            <motion.h1

              initial={{
                opacity: 0,
                y: 50
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 0.8
              }}

              className="
              text-white

              text-5xl
              md:text-8xl

              font-black

              leading-none

              max-w-4xl
              "
            >
              {category?.name}
            </motion.h1>

            <motion.p

              initial={{
                opacity: 0,
                y: 40
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                delay: 0.2
              }}

              className="
              mt-6

              max-w-2xl

              text-lg
              md:text-xl

              text-white/90
              "
            >
              {category?.description}
            </motion.p>

            {/* Stats */}

            <motion.div

              initial={{
                opacity: 0,
                y: 30
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                delay: 0.4
              }}

              className="
              mt-10

              flex
              flex-wrap

              gap-4
              "
            >

              <div
                className="
                backdrop-blur-xl

                bg-white/10

                border
                border-white/20

                rounded-2xl

                px-6
                py-4
                "
              >
                <p className="text-white/70 text-sm">
                  Products
                </p>

                <p className="text-white text-2xl font-bold">
                  {products.length}
                </p>
              </div>

              <div
                className="
                backdrop-blur-xl

                bg-white/10

                border
                border-white/20

                rounded-2xl

                px-6
                py-4
                "
              >
                <p className="text-white/70 text-sm">
                  Category
                </p>

                <p className="text-white text-2xl font-bold">
                  Premium
                </p>
              </div>

            </motion.div>

          </div>

        </div>

      </section>

      {/* Products Section */}

      <section
          className="
          max-w-7xl
          mx-auto

          px-6
          py-12
          "
        >

          <ProductFilters

            search={search}
            setSearch={setSearch}

            minPrice={minPrice}
            setMinPrice={setMinPrice}

            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}

            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}

            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}

            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}

            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}

            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}

            selectedOccasion={selectedOccasion}
            setSelectedOccasion={setSelectedOccasion}

            brands={brands}
            genders={genders}
            materials={materials}
            occasions={occasions}

            sizes={sizes}
            colors={colors}

            sort={sort}
            setSort={setSort}

          />

          <div
            className="
            flex
            justify-between
            items-center

            mb-10
            "
          >

          <h2
            className="
            text-3xl
            font-bold
            "
          >
            Products
          </h2>

          <p
            className="
            text-zinc-500
            "
          >
            {filteredProducts.length}
            {" "}
            Products
          </p>

        </div>

        {filteredProducts.length === 0 ? (

          <div
            className="
            py-20
            text-center
            "
          >
            No Products Found
          </div>

        ) : (

          <div
            className="
            grid

            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4

            gap-8
            "
          >

            {filteredProducts.map(
              (product:any)=>(

                <ProductCard
                  key={product._id}
                  product={product}
                />

              )
            )}

          </div>

        )}

      </section>
  
    </MainLayout>

  );

}