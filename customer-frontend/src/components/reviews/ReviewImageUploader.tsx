import { useState } from "react";

import {
  useAuth,
} from "@clerk/clerk-react";

import {
  uploadImage,
} from "../../api/mediaApi";

interface Props {
  images:any[];
  setImages:any;
}

export default function ReviewImageUploader({
  images,
  setImages,
}:Props) {

  const {
    getToken,
  } = useAuth();

  const [uploading,
  setUploading] =
  useState(false);

  const handleUpload =
  async(
    e:React.ChangeEvent<HTMLInputElement>
  )=>{

    const files =
    e.target.files;

    if(!files) return;

    try{

      setUploading(true);

      const token =
      await getToken();

      if(!token){

        alert(
          "Please login first"
        );

        return;

      }

      const uploaded = [];

      for(
        const file of
        Array.from(files)
      ){

        const result =
        await uploadImage(
          file,
          token,
          "footwear/reviews"
        );

        uploaded.push({

          url:
          result.imageUrl,

          publicId:
          result.publicId,

        });

      }

      setImages(
        (prev:any)=>[
          ...prev,
          ...uploaded
        ]
      );

    }
    catch(error){

      console.error(error);

      alert(
        "Upload Failed"
      );

    }
    finally{

      setUploading(false);

    }

  };

  const removeImage =
  (publicId:string)=>{

    setImages(
      (prev:any)=>
      prev.filter(
        (img:any)=>
        img.publicId !== publicId
      )
    );

  };

  return (

    <div className="space-y-4">

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
      />

      {uploading && (
        <p>
          Uploading...
        </p>
      )}

      <div
        className="
        grid
        grid-cols-3
        gap-3
        "
      >

        {images.map(
          (image:any)=>(

          <div
            key={image.publicId}
            className="relative"
          >

            <img
              src={image.url}
              alt=""
              className="
              h-24
              w-full
              object-cover
              rounded-xl
              "
            />

            <button
              type="button"
              onClick={() =>
                removeImage(
                  image.publicId
                )
              }
              className="
              absolute
              top-1
              right-1

              bg-red-500
              text-white

              px-2
              rounded-full
              "
            >
              ×
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}