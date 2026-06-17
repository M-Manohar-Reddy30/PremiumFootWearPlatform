import { useState } from "react";
import { uploadImage } from "../../api/mediaApi";

interface UploadedImage {
  url: string;
  publicId: string;
}

interface Props {
  images: UploadedImage[];
  setImages: React.Dispatch<
    React.SetStateAction<UploadedImage[]>
  >;
}

export default function ImageUploader({
  images,
  setImages,
}: Props) {
  const [uploading, setUploading] =
    useState(false);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files) return;

    setUploading(true);

    try {
      const uploadedImages = [];

      for (const file of Array.from(files)) {
        const result =
          await uploadImage(
            file,
            "footwear/products"
          );

        uploadedImages.push({
          url: result.imageUrl,
          publicId: result.publicId,
        });
      }

      setImages((prev) => [
        ...prev,
        ...uploadedImages,
      ]);
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (
    publicId: string
  ) => {
    setImages((prev) =>
      prev.filter(
        (img) =>
          img.publicId !== publicId
      )
    );
  };

  return (
    <div className="space-y-4">

      <input
        type="file"
        multiple
        onChange={handleUpload}
      />

      {uploading && (
        <p>Uploading...</p>
      )}

      <div className="grid grid-cols-4 gap-4">

        {images.map((image) => (

          <div
            key={image.publicId}
            className="relative"
          >

            <img
              src={image.url}
              alt=""
              className="
              h-32
              w-full
              object-cover
              rounded
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
              rounded
              "
            >
              X
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}