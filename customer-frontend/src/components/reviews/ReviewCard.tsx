import StarRating
from "./StarRating";

import {
  useState,
} from "react";

import ReviewImageLightbox
from "./ReviewImageLightbox";

export default function ReviewCard({
  review,
}:any) {

  const [
    selectedImage,
    setSelectedImage
  ] =
  useState("");

  return (

  <>

    {selectedImage && (

      <ReviewImageLightbox

        image={selectedImage}

        onClose={() =>
          setSelectedImage("")
        }

      />

    )}

    <div
      className="
      border

      rounded-3xl

      p-6

      bg-white
      dark:bg-zinc-900

      shadow-sm
      "
    >

      <div
        className="
        flex
        justify-between
        items-start
        "
      >

        <div>

          <h4
            className="
            font-semibold
            text-lg
            "
          >
            {
              review.user?.fullName ||
              "Customer"
            }
          </h4>

          <p
            className="
            text-sm
            text-zinc-500
            mt-1
            "
          >
            {new Date(
              review.createdAt
            ).toLocaleDateString()}
          </p>

        </div>

        <StarRating
          rating={review.rating}
        />

      </div>

      <p
        className="
        mt-4

        text-zinc-700
        dark:text-zinc-300

        leading-relaxed
        "
      >
        {review.comment}
      </p>

      {review.images?.length > 0 && (

        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-4

          gap-3

          mt-5
          "
        >

          {review.images.map(
            (
              image:any,
              index:number
            ) => (

              <img
                key={index}
                src={image.url}
                alt=""

                onClick={() =>
                  setSelectedImage(
                    image.url
                  )
                }

                className="
                h-32
                w-full

                object-cover

                rounded-2xl

                cursor-pointer

                hover:scale-105

                transition
                "
              />

            )
          )}

        </div>

      )}

    </div>

  </>

);

}