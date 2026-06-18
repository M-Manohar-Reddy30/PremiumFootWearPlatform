import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

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

  selectedBrand:string;
  setSelectedBrand:any;

  selectedGender:string;
  setSelectedGender:any;

  selectedMaterial:string;
  setSelectedMaterial:any;

  selectedOccasion:string;
  setSelectedOccasion:any;

  brands:string[];
  genders:string[];
  materials:string[];
  occasions:string[];

  sizes:string[];
  colors:string[];

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

  selectedBrand,
  setSelectedBrand,

  selectedGender,
  setSelectedGender,

  selectedMaterial,
  setSelectedMaterial,

  selectedOccasion,
  setSelectedOccasion,

  brands,
  genders,
  materials,
  occasions,

  sizes,
  colors,

  sort,
  setSort,

}: Props) {

  const [open, setOpen] =
  useState(false);

  return (

    <>
      {/* Mobile */}

      <div className="md:hidden mb-6">

        <div className="flex gap-3">

          <button

            onClick={() =>
              setOpen(true)
            }

            className="
            flex-1

            h-12

            rounded-2xl

            border

            flex
            items-center
            justify-center

            gap-2

            bg-white
            "
          >

            <SlidersHorizontal size={18} />

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
              Sort
            </option>

            <option value="price">
              Price Low → High
            </option>

            <option value="-price">
              Price High → Low
            </option>

          </select>

        </div>

      </div>

      {/* Desktop */}

      <div
        className="
        hidden
        md:grid

        grid-cols-2
        lg:grid-cols-5
        xl:grid-cols-10

        gap-4

        mb-10

        p-5

        rounded-3xl

        border

        bg-white

        shadow-sm
        "
      >

        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }
          className="
          h-12
          border
          rounded-xl
          px-4
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
          border
          rounded-xl
          px-4
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
          border
          rounded-xl
          px-4
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
          h-12
          border
          rounded-xl
          px-4
          "
        >
          <option value="">
            All Brands
          </option>

          {brands.map((brand)=>(
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
            )
          }
          className="
          h-12
          border
          rounded-xl
          px-4
          "
        >
          <option value="">
            All Gender
          </option>

          {genders.map((gender)=>(
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
            )
          }
          className="
          h-12
          border
          rounded-xl
          px-4
          "
        >
          <option value="">
            All Materials
          </option>

          {materials.map((material)=>(
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
            )
          }
          className="
          h-12
          border
          rounded-xl
          px-4
          "
        >
          <option value="">
            All Occasions
          </option>

          {occasions.map((occasion)=>(
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
          onChange={(e)=>
            setSelectedSize(
              e.target.value
            )
          }
          className="
          h-12
          border
          rounded-xl
          px-4
          "
        >

          <option value="">
            All Sizes
          </option>

          {sizes
          .filter(Boolean)
          .map((size)=>(
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
          h-12
          border
          rounded-xl
          px-4
          "
        >

          <option value="">
            All Colors
          </option>

          {colors
          .filter(Boolean)
          .map((color)=>(
            <option
              key={color}
              value={color}
            >
              {color}
            </option>
          ))}

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
          border
          rounded-xl
          px-4
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

        </select>

      </div>

      {/* Mobile Drawer */}

      {open && (

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

            rounded-t-[30px]

            p-6

            max-h-[85vh]

            overflow-y-auto
            "
          >

            <h3
              className="
              text-2xl
              font-bold

              mb-6
              "
            >
              Filters
            </h3>

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e)=>
                setSearch(
                  e.target.value
                )
              }
              className="
              w-full

              border

              rounded-xl

              p-3

              mb-4
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
              w-full

              border

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
              rounded-xl
              p-3
              mb-4
              "
            >
              <option value="">
                All Brands
              </option>

              {brands.map((brand)=>(
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
                )
              }
              className="
              w-full
              border
              rounded-xl
              p-3
              mb-4
              "
            >
              <option value="">
                All Gender
              </option>

              {genders.map((gender)=>(
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
                )
              }
              className="
              w-full
              border
              rounded-xl
              p-3
              mb-4
              "
            >
              <option value="">
                All Materials
              </option>

              {materials.map((material)=>(
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
                )
              }
              className="
              w-full
              border
              rounded-xl
              p-3
              mb-4
              "
            >
              <option value="">
                All Occasions
              </option>

              {occasions.map((occasion)=>(
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
              onChange={(e)=>
                setSelectedSize(
                  e.target.value
                )
              }
              className="
              w-full
              border
              rounded-xl
              p-3
              mb-4
              "
            >
              <option value="">
                All Sizes
              </option>

              {sizes
              .filter(Boolean)
              .map((size)=>(
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
              rounded-xl
              p-3
              mb-4
              "
            >
              <option value="">
                All Colors
              </option>

              {colors
              .filter(Boolean)
              .map((color)=>(
                <option
                  key={color}
                  value={color}
                >
                  {color}
                </option>
              ))}
            </select>

            <div className="flex gap-3">

              <button

                onClick={() => {

                  setSearch("");

                  setMinPrice("");
                  setMaxPrice("");

                  setSelectedBrand("");
                  setSelectedGender("");
                  setSelectedMaterial("");
                  setSelectedOccasion("");

                  setSelectedSize("");
                  setSelectedColor("");

                  setSort("");

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
                  setOpen(false)
                }

                className="
                flex-1

                bg-black
                text-white

                py-3

                rounded-xl
                "
              >
                Apply
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}