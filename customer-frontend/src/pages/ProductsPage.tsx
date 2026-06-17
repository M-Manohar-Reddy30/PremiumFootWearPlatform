import {
  useEffect,
  useState,
} from "react";

import MainLayout
from "../layouts/MainLayout";

import ProductCard
from "../components/products/ProductCard";

import ProductSkeleton
from "../components/products/ProductSkeleton";

import {
  getProducts,
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

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

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

            minPrice,

            maxPrice,

            size:
              selectedSize,

            color:
              selectedColor,

            page,

            limit: 12,

          });

        setProducts(
          res.data.products || []
        );

        setTotalPages(
          res.data.pagination?.pages || 1
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

  useEffect(() => {

    loadProducts();

  }, [
      search,
      sort,
      selectedCategory,
      selectedSize,
      selectedColor,
      minPrice,
      maxPrice,
      page,
    ]);

  useEffect(() => {

    loadCategories();

  }, []);

  useEffect(() => {

  console.log(
    "Quick View Product:",
    quickViewProduct
  );

}, [quickViewProduct]);

  console.log(quickViewProduct);

  return (

    <MainLayout>

      <section
        className="
        max-w-7xl
        mx-auto
        px-6
        py-12
        "
      >

        <h1
          className="
          text-4xl
          font-bold
          mb-8
          "
        >
          Shop Collection
        </h1>

        {/* Filters */}

        <div
          className="
          flex
          flex-col
          md:flex-row
          gap-4
          mb-10
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
            border
            p-3
            rounded-xl
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
            value={selectedSize}
            onChange={(e) =>
              setSelectedSize(
                e.target.value
              )
            }
            className="
            border
            p-3
            rounded-xl
            "
          >

            <option value="">
              All Sizes
            </option>

            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>

          </select>

          <select
            value={selectedColor}
            onChange={(e) =>
              setSelectedColor(
                e.target.value
              )
            }
            className="
            border
            p-3
            rounded-xl
            "
          >

            <option value="">
              All Colors
            </option>

            <option value="Black">
              Black
            </option>

            <option value="White">
              White
            </option>

            <option value="Blue">
              Blue
            </option>

            <option value="Red">
              Red
            </option>

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
            border
            p-3
            rounded-xl
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

        {/* Product Count */}

        <div
          className="
          mb-6
          text-zinc-500
          "
        >
          {products.length} Products Found
        </div>

        {/* Content */}

        {loading ? (

          <div
            className="
            grid

            grid-cols-2
            md:grid-cols-4

            gap-6
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
            py-20
            text-center
            text-zinc-500
            "
          >
            No Products Found
          </div>

        ) : (

          <>
            <div
              className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-6
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
              justify-center
              items-center
              gap-4
              mt-12
              "
            >

              <button
                disabled={
                  page === 1
                }
                onClick={() =>
                  setPage(
                    page - 1
                  )
                }
                className="
                border
                px-4
                py-2
                rounded-xl
                disabled:opacity-50
                "
              >
                Previous
              </button>

              <span>
                Page {page} / {totalPages}
              </span>

              <button
                disabled={
                  page === totalPages
                }
                onClick={() =>
                  setPage(
                    page + 1
                  )
                }
                className="
                border
                px-4
                py-2
                rounded-xl
                disabled:opacity-50
                "
              >
                Next
              </button>

            </div>

          </>

        )}

      </section>

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