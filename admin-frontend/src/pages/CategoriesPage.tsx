import { useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryApi";

import { uploadImage }
from "../api/uploadApi";

export default function CategoriesPage() {

  const [categories, setCategories] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

    const [uploading, setUploading] =
    useState(false);

  const [editingId, setEditingId] =
    useState("");

  const [form, setForm] =
  useState({
    name: "",
    description: "",

    image: {
      url: "",
      publicId: "",
    },

    isActive: true,
  });

    const [search, setSearch] =
      useState("");

    const [currentPage, setCurrentPage] =
      useState(1);

    const itemsPerPage = 5;

    useEffect(() => {

      setCurrentPage(1);

    }, [search]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories =
async () => {

  try {

    setLoading(true);

    const res =
      await getCategories();

    setCategories(
      res.data
    );

  } catch (error) {

    console.error(error);

    setCategories([]);

  } finally {

    setLoading(false);

  }

};

  const resetForm = () => {

    setEditingId("");

    setForm({
    name: "",
    description: "",

    image: {
      url: "",
      publicId: "",
    },

    isActive: true,
  });

  };

  const handleSubmit =
    async () => {

      if (!form.name.trim()) {

        alert(
          "Category name required"
        );

        return;
      }

      try {

        console.log("FORM DATA", form);

        if (editingId) {

          await updateCategory(
            editingId,
            form
          );

          alert(
            "Category Updated"
          );

        } else {

          await createCategory(
            form
          );

          alert(
            "Category Created"
          );

        }

        resetForm();

        loadCategories();

      } catch (error) {

        console.error(error);

      }

    };

  const handleEdit =
    (category: any) => {

      setEditingId(
        category._id
      );

      setForm({
        name:
          category.name || "",
        description:
          category.description || "",
        image:
        category.image?.url || {
          url:"",
          publicId:""
        },
        isActive:
          category.isActive,
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    };

  const handleDelete =
    async (id: string) => {

      const confirmDelete =
        window.confirm(
          "Delete category?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteCategory(id);

        loadCategories();

      } catch (error) {

        console.error(error);

      }

    };

   const handleImageUpload =
async (
e: React.ChangeEvent<HTMLInputElement>
)=>{

const file =
e.target.files?.[0];

if(!file) return;

try{

setUploading(true);

const res =
await uploadImage(file);

setForm((prev)=>({
  ...prev,

  image: {
    url: res.imageUrl,
    publicId: res.publicId,
  }

}));

}
catch(error){

console.error(error);

alert(
"Image Upload Failed"
);

}
finally{

setUploading(false);

}

};

const filteredCategories =
  categories.filter(
    (category) =>
      category.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

const totalPages =
  Math.ceil(
    filteredCategories.length /
    itemsPerPage
  );

const paginatedCategories =
  filteredCategories.slice(
    (currentPage - 1) *
      itemsPerPage,
    currentPage *
      itemsPerPage
  );

  return (

    <div>

      <h1
        className="
        text-3xl
        font-bold
        mb-6
        "
      >
        Categories
      </h1>

      {/* FORM */}

      <div
        className="
        bg-white
        p-6
        rounded-xl
        shadow
        mb-6
        space-y-4
        "
      >

        <input
          type="text"
          placeholder="Category Name"
          value={form.name}
          onChange={(e)=>
            setForm({
              ...form,
              name:
                e.target.value,
            })
          }
          className="
          w-full
          border
          p-3
          rounded
          "
        />

        <textarea
          placeholder="Description"
          value={
            form.description
          }
          onChange={(e)=>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
          className="
          w-full
          border
          p-3
          rounded
          "
        />

        <div>

          <input
          type="file"
          accept="image/*"
          onChange={
          handleImageUpload
          }
          />

        </div>

        {form.image?.url && (

          <img
            src={form.image.url}
            alt=""
            className="
            w-32
            h-32
            object-cover
            rounded
            border
            "
          />

        )}

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
              form.isActive
            }
            onChange={(e)=>
              setForm({
                ...form,
                isActive:
                  e.target.checked,
              })
            }
          />

          Active

        </label>

        <div
          className="
          flex
          gap-3
          "
        >

          <button
            onClick={
              handleSubmit
            }
            disabled={uploading}
            className="
            bg-black
            text-white
            px-5
            py-3
            rounded
            disabled:opacity-50
            "
          >
            {
              uploading
                ? "Uploading..."
                : editingId
                ? "Update Category"
                : "Create Category"
            }
          </button>

          {editingId && (

            <button
              onClick={
                resetForm
              }
              className="
              border
              px-5
              py-3
              rounded
              "
            >
              Cancel
            </button>

          )}

        </div>

      </div>

      <div
  className="
  flex
  justify-between
  items-center
  mb-4
  "
>

  <input
    type="text"
    placeholder="Search Categories..."
    value={search}
    onChange={(e)=>
      setSearch(
        e.target.value
      )
    }
    className="
    border
    p-3
    rounded
    w-80
    "
  />

  <div
    className="
    text-gray-500
    "
  >
    Total:
    {" "}
    {
      filteredCategories.length
    }
  </div>

</div>

      {/* TABLE */}

      <div
        className="
        bg-white
        rounded-xl
        shadow
        overflow-hidden
        "
      >

        {loading ? (

          <div className="p-6">
            <div
              className="
              p-10
              text-center
              "
            >
              Loading Categories...
            </div>
          </div>

          

        ) : (

          <table
            className="w-full"
          >

            <thead>

              <tr
                className="
                border-b
                "
              >

                <th className="p-4">
                  Image
                </th>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Description
                </th>

                <th className="p-4">
                  Status
                </th>

                <th className="p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

  {paginatedCategories.map(
    (category) => (

      <tr
        key={category._id}
        className="border-b"
      >

        <td className="p-4">

          {category.image?.url ? (

            <img
              src={category.image.url}
              alt=""
              className="
              w-16
              h-16
              object-cover
              rounded
              "
            />

          ) : (

            "No Image"

          )}

        </td>

        <td className="p-4">
          {category.name}
        </td>

        <td className="p-4">
          {category.description}
        </td>

        <td className="p-4">

          <span
            className={`
            px-3
            py-1
            rounded-full
            text-sm
            ${
              category.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
            `}
          >

            {category.isActive
              ? "Active"
              : "Inactive"}

          </span>

        </td>

        <td className="p-4">

          <div
            className="
            flex
            gap-4
            "
          >

            <button
              onClick={() =>
                handleEdit(category)
              }
              className="
              text-blue-500
              "
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(
                  category._id
                )
              }
              className="
              text-red-500
              "
            >
              Delete
            </button>

          </div>

        </td>

      </tr>

    )
  )}

  {paginatedCategories.length === 0 && (

    <tr>

      <td
        colSpan={5}
        className="
        p-10
        text-center
        text-gray-500
        "
      >

        No Categories Found

      </td>

    </tr>

  )}

</tbody>

          </table>

        )}

      </div>

      <div
  className="
  flex
  justify-center
  gap-3
  p-5
  "
>

  <button
    disabled={
      currentPage === 1
    }
    onClick={() =>
      setCurrentPage(
        currentPage - 1
      )
    }
    className="
    border
    px-4
    py-2
    rounded
    "
  >
    Prev
  </button>

  <span>
    Page {currentPage}
    {" / "}
    {totalPages || 1}
  </span>

  <button
    disabled={
      currentPage ===
      totalPages
    }
    onClick={() =>
      setCurrentPage(
        currentPage + 1
      )
    }
    className="
    border
    px-4
    py-2
    rounded
    "
  >
    Next
  </button>

</div>

    </div>

  );

}