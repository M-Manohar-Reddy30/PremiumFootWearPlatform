import { useState } from "react";

interface Props {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function CategoryForm({
  onSubmit,
  initialData,
}: Props) {

  const [name,setName] =
  useState(
    initialData?.name || ""
  );

  const [description,setDescription] =
  useState(
    initialData?.description || ""
  );

  const [image,setImage] =
  useState(
    initialData?.image || ""
  );

  const [isActive,setIsActive] =
  useState(
    initialData?.isActive ?? true
  );

  return (

    <form
      className="space-y-4"
      onSubmit={(e)=>{

        e.preventDefault();

        onSubmit({
          name,
          description,
          image,
          isActive
        });

      }}
    >

      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e)=>
          setName(e.target.value)
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
        value={description}
        onChange={(e)=>
          setDescription(
            e.target.value
          )
        }
        className="
        w-full
        border
        p-3
        rounded
        "
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e)=>
          setImage(
            e.target.value
          )
        }
        className="
        w-full
        border
        p-3
        rounded
        "
      />

      <label
      className="
      flex
      gap-2
      items-center
      "
      >

        <input
          type="checkbox"
          checked={isActive}
          onChange={(e)=>
            setIsActive(
              e.target.checked
            )
          }
        />

        Active

      </label>

      <button
        className="
        bg-black
        text-white
        px-5
        py-3
        rounded
        "
      >
        Save Category
      </button>

    </form>

  );

}