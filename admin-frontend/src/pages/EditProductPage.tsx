import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getProduct,
  updateProduct,
} from "../api/productApi";

import {
  getCategories,
} from "../api/categoryApi";

import ImageUploader from "../components/products/ImageUploader";

export default function EditProductPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] =
    useState<any>(null);

  const [categories, setCategories] =
    useState<any[]>([]);

  const [images, setImages] =
    useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        productRes,
        categoryRes,
      ] = await Promise.all([
        getProduct(id!),
        getCategories(),
      ]);

      setProduct(
        productRes.data.product
      );

      setImages(
        productRes.data.product.images || []
      );

      setCategories(
        categoryRes.data.data || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.value,
    });
  };

  const toggleField = (
    field: string
  ) => {
    setProduct({
      ...product,
      [field]:
        !product[field],
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await updateProduct(
        id!,
        {
          ...product,
          images,
        }
      );

      alert(
        "Product Updated Successfully"
      );

      navigate("/products");

    } catch (error) {
      console.error(error);

      alert(
        "Update Failed"
      );
    }
  };

  if (!product) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div>

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
        bg-white
        p-6
        rounded-xl
        shadow
        space-y-4
        "
      >

        {/* Product Name */}

        <input
          type="text"
          name="name"
          value={product.name || ""}
          onChange={handleChange}
          className="
          border
          p-3
          w-full
          "
          placeholder="Product Name"
        />

        {/* Description */}

        <textarea
          name="description"
          value={
            product.description || ""
          }
          onChange={handleChange}
          className="
          border
          p-3
          w-full
          "
          placeholder="Description"
        />

        {/* Price */}

        <input
          type="number"
          name="price"
          value={product.price || 0}
          onChange={handleChange}
          className="
          border
          p-3
          w-full
          "
          placeholder="Price"
        />

        {/* Discount Price */}

        <input
          type="number"
          name="discountPrice"
          value={
            product.discountPrice || 0
          }
          onChange={handleChange}
          className="
          border
          p-3
          w-full
          "
          placeholder="Discount Price"
        />

        <input
          type="text"
          name="brand"
          value={product.brand || ""}
          onChange={handleChange}
          className="
          border
          p-3
          w-full
          "
          placeholder="Brand"
        />

        <select
          name="gender"
          value={product.gender || ""}
          onChange={handleChange}
          className="
          border
          p-3
          w-full
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

        <input
          type="text"
          name="material"
          value={product.material || ""}
          onChange={handleChange}
          className="
          border
          p-3
          w-full
          "
          placeholder="Material"
        />

        <input
          type="text"
          name="occasion"
          value={product.occasion || ""}
          onChange={handleChange}
          className="
          border
          p-3
          w-full
          "
          placeholder="Occasion"
        />

        {/* Category */}

        <select
          name="category"
          value={
            product.category?._id ||
            product.category
          }
          onChange={handleChange}
          className="
          border
          p-3
          w-full
          "
        >

          {categories.map(
            (category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            )
          )}

        </select>

        {/* Stock */}

        <input
          type="number"
          name="stock"
          value={product.stock || 0}
          onChange={handleChange}
          className="
          border
          p-3
          w-full
          "
          placeholder="Stock"
        />

        {/* Sizes */}

        <input
          value={
            product.sizes?.join(",") ||
            ""
          }
          onChange={(e) =>
            setProduct({
              ...product,
              sizes:
                e.target.value
                  .split(",")
                  .map((s) =>
                    s.trim()
                  ),
            })
          }
          className="
          border
          p-3
          w-full
          "
          placeholder="6,7,8,9,10"
        />

        {/* Colors */}

        <input
          value={
            product.colors?.join(",") ||
            ""
          }
          onChange={(e) =>
            setProduct({
              ...product,
              colors:
                e.target.value
                  .split(",")
                  .map((c) =>
                    c.trim()
                  ),
            })
          }
          className="
          border
          p-3
          w-full
          "
          placeholder="Black,White"
        />

        {/* Product Images */}

        <div>

          <h3
            className="
            font-semibold
            mb-3
            "
          >
            Product Images
          </h3>

          <ImageUploader
            images={images}
            setImages={setImages}
          />

        </div>

        {/* Toggles */}

        <div className="space-y-3">

          <label
            className="
            flex
            items-center
            gap-2
            "
          >
            <input
              type="checkbox"
              checked={
                product.featured || false
              }
              onChange={() =>
                toggleField(
                  "featured"
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
              checked={
                product.trending || false
              }
              onChange={() =>
                toggleField(
                  "trending"
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
              checked={
                product.newArrival || false
              }
              onChange={() =>
                toggleField(
                  "newArrival"
                )
              }
            />
            New Arrival
          </label>

        </div>

        <button
          type="submit"
          className="
          bg-black
          text-white
          px-6
          py-3
          rounded
          "
        >
          Update Product
        </button>

      </form>

    </div>
  );
}