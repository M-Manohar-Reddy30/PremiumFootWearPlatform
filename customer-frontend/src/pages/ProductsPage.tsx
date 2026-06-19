import {
  useEffect,
  useState,
} from "react";

import MainLayout
from "../layouts/MainLayout";

import {
  Filter,
  X
} from "lucide-react";

import ProductCard
from "../components/products/ProductCard";

import ProductSkeleton
from "../components/products/ProductSkeleton";

import {
  getProducts,
  getFilterOptions,
} from "../api/productApi";

import {
  getCategories,
} from "../api/homeApi";

import QuickViewModal
from "../components/products/QuickViewModal";

export default function ProductsPage() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [
    quickViewProduct,
    setQuickViewProduct
  ] = useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState("");

  const [categories, setCategories] =
    useState<any[]>([]);

  const [
    selectedCategory,
    setSelectedCategory
  ] = useState("");

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

  const [filterOptions,
  setFilterOptions] =
  useState<any>({
    brands: [],
    genders: [],
    materials: [],
    occasions: [],
    sizes: [],
    colors: [],
  });

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [totalProducts, setTotalProducts] =
    useState(0);

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [
    mobileFiltersOpen,
    setMobileFiltersOpen
  ] = useState(false);

  const loadProducts =
    async () => {

      try {

        setLoading(true);

        const res =
          await getProducts({

            search,

            sort,

            category:
            selectedCategory,

            brand:
            selectedBrand,

            gender:
            selectedGender,

            material:
            selectedMaterial,

            occasion:
            selectedOccasion,

            minPrice,

            maxPrice,

            size:
            selectedSize,

            color:
            selectedColor,

            page,

            limit:12,

          });

          console.log(res.data);

        setProducts(
          res.data.products || []
        );

        setTotalPages(
          res.data.pagination?.pages || 1
        );

        setTotalProducts(
          res.data.pagination?.total || 0
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  const loadCategories =
    async () => {

      try {

        const res =
          await getCategories();

        setCategories(
          res.data.data || []
        );

      } catch (error) {

        console.error(error);

      }

    };

    const loadFilterOptions =
    async () => {

      try {

        const res =
        await getFilterOptions();

        setFilterOptions(
          res.data
        );

      }
      catch(error){

        console.error(error);

      }

    };

  useEffect(() => {

    loadProducts();

  }, [
        search,
        sort,
        selectedCategory,

        selectedBrand,
        selectedGender,
        selectedMaterial,
        selectedOccasion,

        selectedSize,
        selectedColor,

        minPrice,
        maxPrice,

        page,
      ]);

  useEffect(() => {

  loadCategories();

  loadFilterOptions();

}, []);

  return (

    <MainLayout>

      {/* Hero */}

      <section
        className="
        relative
        overflow-hidden
        py-3
        md:py-20
        "
      >

        <div
          className="
          absolute

          top-0
          left-1/2

          -translate-x-1/2

          w-[900px]
          h-[900px]

          bg-zinc-300/20
          dark:bg-zinc-700/10

          blur-[180px]

          pointer-events-none
          "
        />

        <div
          className="
          max-w-7xl
          mx-auto
          px-4
          md:px-6

          relative
          z-10
          "
        >

          <span
            className="
            hidden md:inline-flex

            items-center

            px-4
            py-2

            rounded-full

            bg-zinc-100
            dark:bg-zinc-900

            text-xs

            mb-6
            "
          >
            Premium Footwear Collection
          </span>

          <h1
            className="
            text-2xl
            md:text-4xl

            font-black

            tracking-tight

            max-w-4xl
            "
          >
            Discover Your
            Next Favorite Pair
          </h1>

          <p
            className="
            hidden md:block

            mt-6

            max-w-2xl

            text-lg

            text-zinc-500
            "
          >
            Luxury sneakers, performance shoes,
            timeless classics and modern designs
            curated for every lifestyle.
          </p>

        </div>

      </section>

      <section
        className="
        max-w-7xl
        mx-auto

        px-4
        md:px-6

        py-6
        md:py-12

        pb-24
        md:pb-12
        "
      >

        <div
          className="
          flex

          flex-col
          md:flex-row

          md:items-end
          md:justify-between

          gap-4

          mb-6
          md:mb-10
          "
        >

          <div>

            <h2
              className="
              text-xl
              md:text-5xl

              font-bold
              "
            >
              All Products
            </h2>

            <p
              className="
              mt-2
              text-zinc-500
              "
            >
              Browse our premium footwear collection
            </p>

          </div>

          <div
            className="
            text-xs
            md:text-sm
            text-zinc-500
            "
          >
            {totalProducts} Products Found
          </div>

          {sort && (
            <span
              className="
              ml-3

              px-3
              py-1

              rounded-full

              bg-zinc-100
              dark:bg-zinc-800

              text-xs
              "
            >
              Sorted
            </span>
          )}

        </div>

        {/* Mobile Filter + Sort Bar */}

        <div
          className="
          md:hidden

          flex
          gap-3

          mb-4
          sticky
          top-24
          z-20
          bg-white
          dark:bg-zinc-950
          py-2
          "
        >

          <button
            onClick={() =>
              setMobileFiltersOpen(true)
            }
            className="
            flex-1

            flex
            items-center
            justify-center

            gap-2

            h-12

            rounded-2xl

            border

            bg-white
            dark:bg-zinc-950

            font-medium
            "
          >

            <Filter size={18} />

            Filters

          </button>

          <select
            value={sort}
            onChange={(e)=>
              setSort(
                e.target.value
              )
            }
            className="
            flex-1

            h-12

            rounded-2xl

            border

            px-4
            "
          >

            <option value="">
              Sort By
            </option>

            <option value="price">
              Price Low → High
            </option>

            <option value="-price">
              Price High → Low
            </option>

            <option value="-createdAt">
              Newest
            </option>

          </select>

        </div>

        {/* Mobile Search */}

        <div
          className="
          md:hidden

          mb-4
          "
        >

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
            w-full

            h-12

            px-4

            rounded-2xl

            border
            "
          />

        </div>

        {/* Desktop Filters */}

        <div
          className="
          hidden
          md:grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          xl:grid-cols-8

          gap-4

          p-5

          rounded-[30px]

          border
          border-zinc-200
          dark:border-zinc-800

          bg-white/70
          dark:bg-zinc-900/70

          backdrop-blur-xl

          shadow-xl

          mb-12
          "
        >

          {/* Category */}

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
            className="
            h-12

            rounded-2xl

            border
            border-zinc-300
            dark:border-zinc-700

            px-4

            bg-white
            dark:bg-zinc-950

            outline-none

            focus:ring-2
            focus:ring-black

            transition
            "
          >

            <option value="">
              All Categories
            </option>

            {categories.map(
              (category: any) => (

                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>

              )
            )}

          </select>

          {/* Search */}

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
            border
            p-3
            rounded-xl
            flex-1
            "
          />

          {/* Min Price */}

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(
                e.target.value
              )
            }
            className="
            border
            p-3
            rounded-xl
            w-full
            md:w-40
            "
          />

          {/* Max Price */}

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(
                e.target.value
              )
            }
            className="
            border
            p-3
            rounded-xl
            w-full
            md:w-40
            "
          />

          <select
            value={selectedBrand}
            onChange={(e)=>
              setSelectedBrand(
              e.target.value
            )}
            className="
            h-12
            rounded-2xl
            border
            px-4
            "
          >

            <option value="">
              All Brands
            </option>

            {filterOptions.brands?.map(
            (brand:any)=>(

              <option
                key={brand}
                value={brand}
              >
                {brand}
              </option>

            ))}

          </select>

          <select
            value={selectedGender}
            onChange={(e)=>
              setSelectedGender(
              e.target.value
            )}
            className="
            h-12
            rounded-2xl
            border
            px-4
            "
          >

            <option value="">
              All Gender
            </option>

            {filterOptions.genders?.map(
            (gender:any)=>(

              <option
                key={gender}
                value={gender}
              >
                {gender}
              </option>

            ))}

          </select>

          <select
            value={selectedMaterial}
            onChange={(e)=>
              setSelectedMaterial(
              e.target.value
            )}
            className="
            h-12
            rounded-2xl
            border
            px-4
            "
          >

            <option value="">
              All Materials
            </option>

            {filterOptions.materials?.map(
            (material:any)=>(

              <option
                key={material}
                value={material}
              >
                {material}
              </option>

            ))}

          </select>

          <select
            value={selectedOccasion}
            onChange={(e)=>
              setSelectedOccasion(
              e.target.value
            )}
            className="
            h-12
            rounded-2xl
            border
            px-4
            "
          >

            <option value="">
              All Occasions
            </option>

            {filterOptions.occasions?.map(
            (occasion:any)=>(

              <option
                key={occasion}
                value={occasion}
              >
                {occasion}
              </option>

            ))}

          </select>

          <select
            value={selectedSize}
            onChange={(e) =>
              setSelectedSize(
                e.target.value
              )
            }
            className="
            h-12

            rounded-2xl

            border
            border-zinc-300
            dark:border-zinc-700

            px-4

            bg-white
            dark:bg-zinc-950

            outline-none

            focus:ring-2
            focus:ring-black

            transition
            "
          >

            <option value="">
              All Sizes
            </option>

            {filterOptions.sizes
              ?.filter((size:any)=>size)
              ?.map((size:any)=>(

              <option
              key={size}
              value={size}
              >
              {size}
              </option>

            ))}

          </select>

          <select
            value={selectedColor}
            onChange={(e) =>
              setSelectedColor(
                e.target.value
              )
            }
            className="
            h-12

            rounded-2xl

            border
            border-zinc-300
            dark:border-zinc-700

            px-4

            bg-white
            dark:bg-zinc-950

            outline-none

            focus:ring-2
            focus:ring-black

            transition
            "
          >

            <option value="">
              All Colors
            </option>

            {filterOptions.colors?.map(
              (color:any)=>(

              <option
              key={color}
              value={color}
              >
              {color}
              </option>

            ))}

          </select>

          {/* Sort */}

          <select
            value={sort}
            onChange={(e) =>
              setSort(
                e.target.value
              )
            }
            className="
            h-12

            rounded-2xl

            border
            border-zinc-300
            dark:border-zinc-700

            px-4

            bg-white
            dark:bg-zinc-950

            outline-none

            focus:ring-2
            focus:ring-black

            transition
            "
          >

            <option value="">
              Sort
            </option>

            <option value="price">
              Price Low → High
            </option>

            <option value="-price">
              Price High → Low
            </option>

            <option value="-createdAt">
              Newest
            </option>

          </select>

          <button

            onClick={() => {

              setSearch("");

              setSort("");

              setSelectedCategory("");

              setSelectedSize("");

              setSelectedColor("");

              setMinPrice("");

              setMaxPrice("");

              setPage(1);

            }}

            className="
            bg-black
            text-white

            px-5
            py-3

            rounded-xl
            "
          >

            Clear

          </button>

        </div>

        <div
          className="
          flex
          flex-wrap

          gap-3

          mt-6
          "
        >

          {selectedCategory && (
            <div className="px-3 py-1.5 rounded-full bg-black text-white text-xs">
              Category
            </div>
          )}

          {selectedSize && (
            <div className="px-3 py-1.5 rounded-full bg-black text-white text-xs">
              Size {selectedSize}
            </div>
          )}

          {selectedColor && (
            <div className="px-3 py-1.5 rounded-full bg-black text-white text-xs">
              {selectedColor}
            </div>
          )}

          {minPrice && (
            <div className="px-3 py-1.5 rounded-full bg-black text-white text-xs">
              ₹{minPrice}+
            </div>
          )}

        </div>



        {/* Content */}

        {loading ? (

          <div
            className="
            grid

           grid-cols-2
           md:grid-cols-3
           xl:grid-cols-4

           gap-3
           md:gap-6
            "
          >

            {Array.from({
              length: 8
            }).map((_, i) => (

              <ProductSkeleton
                key={i}
              />

            ))}

          </div>

        ) : products.length === 0 ? (

          <div
            className="
            py-24
            text-center
            "
          >
            <h3
              className="
              text-3xl
              font-bold
              mb-3
              "
            >
              No Products Found
            </h3>

            <p
              className="
              text-zinc-500
              "
              >
              Try adjusting your filters or search query.
            </p>
          </div>

        ) : (

          <>
            <div
              className="
              grid
              grid-cols-2
              sm:grid-cols-2
              md:grid-cols-3
              xl:grid-cols-4

              gap-3
              md:gap-6
              "
            >

              {products.map(
                (product: any) => (

                  <ProductCard
                    key={product._id}
                    product={product}
                    onQuickView={
                      setQuickViewProduct
                    }
                  />

                )
              )}

            </div>

            {/* Pagination */}

            <div
              className="
              flex

              items-center
              justify-center

              gap-3

              mt-8
              md:mt-16
              "
            >

              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="
                h-10
                md:h-12

                px-4
                md:px-5

                text-sm

                rounded-2xl

                border

                disabled:opacity-40

                hover:bg-black
                hover:text-white

                transition
                "
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, i) => i + 1
              )
              .slice(
                Math.max(0, page - 3),
                Math.min(totalPages, page + 2)
              )
              .map((pageNumber) => (

                <button
                  key={pageNumber}
                  onClick={() =>
                    setPage(pageNumber)
                  }
                  className={`
                  h-10
                  w-10
                  md:h-12
                  md:w-12

                  rounded-2xl

                  transition

                  ${
                    page === pageNumber
                      ? "bg-black text-white"
                      : "border hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }
                  `}
                >
                  {pageNumber}
                </button>

              ))}

              <button
                disabled={
                  page === totalPages
                }
                onClick={() =>
                  setPage(page + 1)
                }
                className="
                h-10
                md:h-12

                px-4
                md:px-5

                text-sm

                rounded-2xl

                border

                disabled:opacity-40

                hover:bg-black
                hover:text-white

                transition
                "
              >
                Next
              </button>

            </div>

          </>

        )}

      </section>

      {mobileFiltersOpen && (

        <div
          className="
          fixed
          inset-0

          bg-black/50

          z-[9999]

          md:hidden
          "
        >

          <div
            className="
            absolute

            bottom-0
            left-0
            right-0

            bg-white
            dark:bg-zinc-950

            rounded-t-3xl

            p-4

            max-h-[85vh]

            overflow-y-auto
            "
          >

            <div
              className="
              flex
              items-center
              justify-between

              mb-6
              "
            >

              <h3
                className="
                text-lg
                font-semibold
                "
              >
                Filters
              </h3>

              <button
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
              >
                <X size={22}/>
              </button>

            </div>

            {/* Category */}

            <select
              value={selectedCategory}
              onChange={(e)=>
                setSelectedCategory(
                  e.target.value
                )
              }
              className="
              w-full

              border
              border-zinc-300
              dark:border-zinc-700

              bg-white
              dark:bg-zinc-900

              rounded-xl
              p-3

              mb-4
              "
            >

              <option value="">
                All Categories
              </option>

              {categories.map(
                (category:any)=>(
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>
                )
              )}

            </select>

            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e)=>
                setMinPrice(
                  e.target.value
                )
              }
              className="
              w-full

              border
              border-zinc-300
              dark:border-zinc-700

              bg-white
              dark:bg-zinc-900

              rounded-xl
              p-3

              mb-4
              "
            />

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e)=>
                setMaxPrice(
                  e.target.value
                )
              }
              className="
              w-full

              border
              border-zinc-300
              dark:border-zinc-700

              bg-white
              dark:bg-zinc-900

              rounded-xl
              p-3

              mb-4
              "
            />

            <select
              value={selectedBrand}
              onChange={(e)=>
                setSelectedBrand(
                  e.target.value
                )
              }
              className="
              w-full
              border
              border-zinc-300
              dark:border-zinc-700

              bg-white
              dark:bg-zinc-900

              rounded-xl
              p-3
              mb-4
              "
            >
              <option value="">
                All Brands
              </option>

              {filterOptions.brands?.map(
                (brand:any)=>(
                  <option
                    key={brand}
                    value={brand}
                  >
                    {brand}
                  </option>
                )
              )}
            </select>

            <select
              value={selectedGender}
              onChange={(e)=>
                setSelectedGender(
                  e.target.value
                )
              }
              className="
              w-full
              border
              border-zinc-300
              dark:border-zinc-700

              bg-white
              dark:bg-zinc-900

              rounded-xl
              p-3
              mb-4
              "
            >
              <option value="">
                All Gender
              </option>

              {filterOptions.genders?.map(
                (gender:any)=>(
                  <option
                    key={gender}
                    value={gender}
                  >
                    {gender}
                  </option>
                )
              )}
            </select>

            <select
              value={selectedMaterial}
              onChange={(e)=>
                setSelectedMaterial(
                  e.target.value
                )
              }
              className="
              w-full
              border
              border-zinc-300
              dark:border-zinc-700

              bg-white
              dark:bg-zinc-900

              rounded-xl
              p-3
              mb-4
              "
            >
              <option value="">
                All Materials
              </option>

              {filterOptions.materials?.map(
                (material:any)=>(
                  <option
                    key={material}
                    value={material}
                  >
                    {material}
                  </option>
                )
              )}
            </select>

            <select
              value={selectedOccasion}
              onChange={(e)=>
                setSelectedOccasion(
                  e.target.value
                )
              }
              className="
              w-full
              border
              border-zinc-300
              dark:border-zinc-700

              bg-white
              dark:bg-zinc-900

              rounded-xl
              p-3
              mb-4
              "
            >
              <option value="">
                All Occasions
              </option>

              {filterOptions.occasions?.map(
                (occasion:any)=>(
                  <option
                    key={occasion}
                    value={occasion}
                  >
                    {occasion}
                  </option>
                )
              )}
            </select>

            <select
              value={selectedSize}
              onChange={(e)=>
                setSelectedSize(
                  e.target.value
                )
              }
              className="
              w-full

              border
              border-zinc-300
              dark:border-zinc-700

              bg-white
              dark:bg-zinc-900

              rounded-xl
              p-3

              mb-4
              "
            >
             
              <option value="">
                All Sizes
              </option>

              {filterOptions.sizes
                ?.filter((size:any)=>size)
                ?.map((size:any)=>(

                  <option
                    key={size}
                    value={size}
                  >
                    {size}
                  </option>

              ))}

            </select>

            <select
              value={selectedColor}
              onChange={(e)=>
                setSelectedColor(
                  e.target.value
                )
              }
              className="
              w-full

              border
              border-zinc-300
              dark:border-zinc-700

              bg-white
              dark:bg-zinc-900

              rounded-xl
              p-3

              mb-6
              "
            >

              <option value="">
                All Colors
              </option>

              {filterOptions.colors?.map(
                (color:any)=>(

                  <option
                    key={color}
                    value={color}
                  >
                    {color}
                  </option>

              ))}

            </select>

            <button

              onClick={() => {

                setSearch("");
                setSort("");

                setSelectedCategory("");
                setSelectedBrand("");
                setSelectedGender("");
                setSelectedMaterial("");
                setSelectedOccasion("");

                setSelectedSize("");
                setSelectedColor("");

                setMinPrice("");
                setMaxPrice("");

                setPage(1);

              }}

              className="
              w-full

              mb-4

              py-3

              rounded-xl

              bg-red-50
              text-red-600
              "
            >

              Reset All Filters

            </button>

            <div
              className="
              flex
              gap-3
              "
            >

              <button

                onClick={() => {

                  setSearch("");
                  setSort("");

                  setSelectedCategory("");

                  setSelectedBrand("");
                  setSelectedGender("");
                  setSelectedMaterial("");
                  setSelectedOccasion("");

                  setSelectedSize("");
                  setSelectedColor("");

                  setMinPrice("");
                  setMaxPrice("");

                }}

                className="
                flex-1

                border

                py-3

                rounded-xl
                "
              >

                Clear

              </button>

              <button

                onClick={() =>
                  setMobileFiltersOpen(
                    false
                  )
                }

                className="
                flex-1

                bg-black
                text-white

                py-3

                rounded-xl
                "
              >

                Apply Filters

              </button>

            </div>

          </div>

        </div>

      )}

      <QuickViewModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onClose={() =>
          setQuickViewProduct(null)
        }
      />

    </MainLayout>

  );

}