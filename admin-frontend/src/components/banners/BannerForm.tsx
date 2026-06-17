import { useState } from "react";

import ImageUploader
from "../products/ImageUploader";

export default function BannerForm({
  onSubmit,
}: any) {

  const [title, setTitle] =
    useState("");

  const [
    subtitle,
    setSubtitle
  ] =
    useState("");

  const [
    buttonText,
    setButtonText
  ] =
    useState("");

  const [
    buttonLink,
    setButtonLink
  ] =
    useState("");

  const [
    displayOrder,
    setDisplayOrder
  ] =
    useState(0);

  const [
    images,
    setImages
  ] =
    useState<any[]>([]);

  const handleSubmit =
    (e:any)=>{

      e.preventDefault();

      if(
        images.length === 0
      ){
        alert(
          "Upload banner image"
        );
        return;
      }

      onSubmit({

        title,

        subtitle,

        buttonText,

        buttonLink,

        displayOrder,

        image:
        images[0],

        active:true

      });

    };

  return (

    <form
      onSubmit={
        handleSubmit
      }
      className="
      bg-white
      p-6
      rounded-xl
      shadow
      space-y-4
      "
    >

      <input
        placeholder="Title"
        value={title}
        onChange={(e)=>
          setTitle(
            e.target.value
          )
        }
        className="
        border
        p-3
        w-full
        "
      />

      <input
        placeholder="Subtitle"
        value={subtitle}
        onChange={(e)=>
          setSubtitle(
            e.target.value
          )
        }
        className="
        border
        p-3
        w-full
        "
      />

      <input
        placeholder="Button Text"
        value={buttonText}
        onChange={(e)=>
          setButtonText(
            e.target.value
          )
        }
        className="
        border
        p-3
        w-full
        "
      />

      <input
        placeholder="Button Link"
        value={buttonLink}
        onChange={(e)=>
          setButtonLink(
            e.target.value
          )
        }
        className="
        border
        p-3
        w-full
        "
      />

      <input
        type="number"
        placeholder="Display Order"
        value={displayOrder}
        onChange={(e)=>
          setDisplayOrder(
            Number(
              e.target.value
            )
          )
        }
        className="
        border
        p-3
        w-full
        "
      />

      <ImageUploader
        images={images}
        setImages={setImages}
      />

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
        Create Banner
      </button>

    </form>

  );

}