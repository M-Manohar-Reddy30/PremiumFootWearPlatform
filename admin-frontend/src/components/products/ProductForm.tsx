import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { productSchema } from "../../features/products/productSchema";

import {
  getCategories,
} from "../../api/categoryApi";

import ImageUploader from "./ImageUploader";

interface Props {
  onSubmit: (
    data: any
  ) => Promise<void>;
}

export default function ProductForm({
  onSubmit,
}: Props) {
  const [images, setImages] =
    useState<any[]>([]);

  const [categories, setCategories] =
    useState<any[]>([]);

  const [sizes, setSizes] =
    useState("");

  const [colors, setColors] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [trending, setTrending] =
    useState(false);

  const [newArrival, setNewArrival] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories =
    async () => {

      try {

        const res =
          await getCategories();

        console.log(
          "CATEGORIES RESPONSE",
          res
        );

        setCategories(
          res.data || []
        );

      } catch (error) {

        console.error(
          "Failed to load categories",
          error
        );

      }

    };

  const submitHandler = async (data: any) => {

    await onSubmit({

      ...data,

      images,

      sizes:
        sizes
          .split(",")
          .map((s) =>
            s.trim()
          )
          .filter(Boolean),

      colors:
        colors
          .split(",")
          .map((c) =>
            c.trim()
          )
          .filter(Boolean),

      featured,

      trending,

      newArrival,

    });

  };

  return (
    <form
      onSubmit={handleSubmit(
        submitHandler
      )}
      className="space-y-4"
    >
      {/* Product Name */}

      <div>
        <input
          placeholder="Product Name"
          {...register("name")}
          className="
          border
          p-3
          w-full
          rounded
          "
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Description */}

      <div>
        <textarea
          placeholder="Description"
          rows={4}
          {...register(
            "description"
          )}
          className="
          border
          p-3
          w-full
          rounded
          "
        />

        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {
              errors.description
                .message
            }
          </p>
        )}
      </div>

      {/* Price */}

      <div>
        <input
          type="number"
          placeholder="Price"
          {...register("price")}
          className="
          border
          p-3
          w-full
          rounded
          "
        />

        {errors.price && (
          <p className="text-red-500 text-sm mt-1">
            {errors.price.message}
          </p>
        )}
      </div>

      {/* Discount Price */}

      <div>
        <input
          type="number"
          placeholder="Discount Price"
          {...register(
            "discountPrice"
          )}
          className="
          border
          p-3
          w-full
          rounded
          "
        />

        {errors.discountPrice && (
          <p className="text-red-500 text-sm mt-1">
            {
              errors
                .discountPrice
                .message
            }
          </p>
        )}
      </div>

      {/* Category */}

      <div>
        <select
          {...register(
            "category"
          )}
          className="
          border
          p-3
          w-full
          rounded
          "
        >
          <option value="">
            Select Category
          </option>

          {categories.map(
            (category) => (
              <option
                key={
                  category._id
                }
                value={
                  category._id
                }
              >
                {
                  category.name
                }
              </option>
            )
          )}
        </select>

        {errors.category && (
          <p className="text-red-500 text-sm mt-1">
            {
              errors.category
                .message
            }
          </p>
        )}
      </div>

      <div>
        <input
          placeholder="Brand (Nike, Puma, Adidas)"
          {...register("brand")}
          className="
          border
          p-3
          w-full
          rounded
          "
        />

        {errors.brand && (
          <p className="text-red-500 text-sm mt-1">
            {errors.brand.message}
          </p>
        )}
      </div>

      <div>
        <select
          {...register("gender")}
          className="
          border
          p-3
          w-full
          rounded
          "
        >

          <option value="">
            Select Gender
          </option>

          <option value="Men">
            Men
          </option>

          <option value="Women">
            Women
          </option>

          <option value="Unisex">
            Unisex
          </option>

        </select>

        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">
            {errors.gender.message}
          </p>
        )}
      </div>

      <div>
        <input
          placeholder="
          Material
          (Leather, Mesh, Knit)
          "
          {...register("material")}
          className="
          border
          p-3
          w-full
          rounded
          "
        />
      </div>

      <div>
        <input
          placeholder="
          Occasion
          (Running, Casual, Sports)
          "
          {...register("occasion")}
          className="
          border
          p-3
          w-full
          rounded
          "
        />
      </div>

      {/* Stock */}

      <div>
        <input
          type="number"
          placeholder="Stock Quantity"
          {...register("stock")}
          className="
          border
          p-3
          w-full
          rounded
          "
        />

        {errors.stock && (
          <p className="text-red-500 text-sm mt-1">
            {errors.stock.message}
          </p>
        )}
      </div>

      {/* Sizes */}

      <div>

        <input
          value={sizes}

          onChange={(e)=>
            setSizes(
              e.target.value
            )
          }

          placeholder="
          Sizes
          (6,7,8,9,10)
          "

          className="
          border
          p-3
          w-full
          rounded
          "
        />

      </div>

      {/* Colors */}

      <div>

        <input
          value={colors}

          onChange={(e)=>
            setColors(
              e.target.value
            )
          }

          placeholder="
          Colors
          (Black,White,Blue)
          "

          className="
          border
          p-3
          w-full
          rounded
          "
        />

      </div>

      {/* Images */}

      <div>
        <label className="font-medium block mb-2">
          Product Images
        </label>

        <ImageUploader
          images={images}
          setImages={setImages}
        />

        <div
          className="
          grid
          md:grid-cols-3
          gap-4
          mt-6
          "
        >

          <label
            className="
            flex
            items-center
            gap-2
            "
          >

            <input
              type="checkbox"

              checked={featured}

              onChange={() =>
                setFeatured(
                  !featured
                )
              }
            />

            Featured

          </label>

          <label
            className="
            flex
            items-center
            gap-2
            "
          >

            <input
              type="checkbox"

              checked={trending}

              onChange={() =>
                setTrending(
                  !trending
                )
              }
            />

            Trending

          </label>

          <label
            className="
            flex
            items-center
            gap-2
            "
          >

            <input
              type="checkbox"

              checked={newArrival}

              onChange={() =>
                setNewArrival(
                  !newArrival
                )
              }
            />

            New Arrival

          </label>

        </div>

      </div>

      {/* Submit */}

      <button
        type="submit"
        className="
        bg-black
        text-white
        px-5
        py-3
        rounded
        hover:opacity-90
        "
      >
        Save Product
      </button>
    </form>
  );
}