interface Props {

  search:string;
  setSearch:any;

  minPrice:string;
  setMinPrice:any;

  maxPrice:string;
  setMaxPrice:any;

  selectedSize:string;
  setSelectedSize:any;

  selectedColor:string;
  setSelectedColor:any;

  sort:string;
  setSort:any;

}

export default function ProductFilters({

  search,
  setSearch,

  minPrice,
  setMinPrice,

  maxPrice,
  setMaxPrice,

  selectedSize,
  setSelectedSize,

  selectedColor,
  setSelectedColor,

  sort,
  setSort,

}:Props){

  return (

    <div
      className="
      sticky
      top-20
      z-30

      mb-12

      backdrop-blur-xl

      bg-white/80
      dark:bg-zinc-900/80

      border
      border-zinc-200
      dark:border-zinc-800

      rounded-3xl

      shadow-xl

      p-5
      "
    >

      <div
        className="
        grid

        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-6

        gap-4
        "
      >

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
          className="
          h-12

          rounded-2xl

          border
          border-zinc-300

          px-4

          bg-white
          dark:bg-zinc-950

          outline-none

          focus:ring-2
          focus:ring-black
          "
        />

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
          h-12

          rounded-2xl

          border
          border-zinc-300

          px-4

          bg-white
          dark:bg-zinc-950

          outline-none

          focus:ring-2
          focus:ring-black
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
          h-12

          rounded-2xl

          border
          border-zinc-300

          px-4

          bg-white
          dark:bg-zinc-950

          outline-none

          focus:ring-2
          focus:ring-black
          "
        />

        <select
          value={selectedSize}
          onChange={(e)=>
            setSelectedSize(
              e.target.value
            )
          }
          className="
          h-12

          rounded-2xl

          border
          border-zinc-300

          px-4

          bg-white
          dark:bg-zinc-950
          "
        >

          <option value="">
            All Sizes
          </option>

          <option value="6">Size 6</option>
          <option value="7">Size 7</option>
          <option value="8">Size 8</option>
          <option value="9">Size 9</option>
          <option value="10">Size 10</option>

        </select>

        <select
          value={selectedColor}
          onChange={(e)=>
            setSelectedColor(
              e.target.value
            )
          }
          className="
          h-12

          rounded-2xl

          border
          border-zinc-300

          px-4

          bg-white
          dark:bg-zinc-950
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

        <select
          value={sort}
          onChange={(e)=>
            setSort(
              e.target.value
            )
          }
          className="
          h-12

          rounded-2xl

          border
          border-zinc-300

          px-4

          bg-white
          dark:bg-zinc-950
          "
        >

          <option value="">
            Sort By
          </option>

          <option value="price">
            Price ↑
          </option>

          <option value="-price">
            Price ↓
          </option>

        </select>

      </div>

    </div>

  );

}