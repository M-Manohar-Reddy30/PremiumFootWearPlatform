import StarRating
from "./StarRating";

import {
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  CheckCircle2,
  ThumbsUp,
} from "lucide-react";

import ReviewImageLightbox
from "./ReviewImageLightbox";

import {
  markReviewHelpful,
} from "../../api/reviewApi";

export default function ReviewCard({
  review,
}: any) {

  const [
    selectedImage,
    setSelectedImage
  ] =
  useState("");

  const [
    helpful,
    setHelpful
  ] =
  useState(false);

  const customerName =
    review.user?.fullName ||
    "Customer";

  const initials =
    customerName
      .split(" ")
      .map(
        (word:string)=>
        word[0]
      )
      .join("")
      .substring(0,2)
      .toUpperCase();

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

      <motion.div

        whileHover={{
          y:-6,
        }}

        transition={{
          duration:0.25,
        }}

        className="
        border

        border-zinc-200
        dark:border-zinc-800

        rounded-[32px]

        p-4
        md:p-8

        bg-white
        dark:bg-zinc-950

        shadow-sm
        hover:shadow-2xl

        transition-all
        duration-500
        "
      >

        {/* Header */}

        <div
          className="
          flex
          justify-between
          items-start
          gap-2
          md:gap-4
          "
        >

          <div
            className="
            flex
            items-center
            gap-4
            "
          >

            {/* Avatar */}

            <div
              className="
              w-10
              h-10

              md:w-14
              md:h-14

              rounded-full

              bg-black
              text-white

              flex
              items-center
              justify-center

              font-bold
              "
            >
              {initials}
            </div>

            <div>

              <h4
                className="
                font-bold
                text-base
                md:text-lg
                "
              >
                {customerName}
              </h4>

              <div
                className="
                flex
                items-center
                gap-2

                mt-1
                "
              >

                {review.verifiedPurchase && (

                  <>

                    <CheckCircle2
                      size={16}
                      className="
                      text-green-500
                      "
                    />

                    <span
                      className="
                      text-sm
                      text-zinc-500
                      "
                    >
                      Verified Purchase
                    </span>

                  </>

                )}

              </div>

              <p
                className="
                text-xs
                text-zinc-400

                mt-1
                "
              >
                {new Date(
                  review.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

          <StarRating
            rating={review.rating}
          />

        </div>

        {/* Review Text */}

        <p
          className="
          mt-6

          text-zinc-700
          dark:text-zinc-300

          leading-relaxed

          text-base
          "
        >
          {review.comment}
        </p>

        {/* Images */}

        {review.images?.length > 0 && (

          <div
            className="
            grid

            grid-cols-2
            md:grid-cols-4

            gap-4

            mt-6
            "
          >

            {review.images.map(
              (
                image:any,
                index:number
              ) => (

                <motion.img

                  whileHover={{
                    scale:1.05,
                  }}

                  key={index}

                  src={image.url}

                  alt=""

                  onClick={() =>
                    setSelectedImage(
                      image.url
                    )
                  }

                  className="
                  h-24
                  md:h-36
                  w-full

                  object-cover

                  rounded-2xl

                  cursor-pointer

                  shadow-md
                  "
                />

              )
            )}

          </div>

        )}

        {/* Footer */}

        <div
          className="
          flex
          flex-col
          sm:flex-row

          gap-3

          sm:items-center
          sm:justify-between

          mt-6

          pt-5

          border-t
          "
        >

          <div
            className="
            text-sm
            text-zinc-500
            "
          >
            Product Purchased & Reviewed
          </div>

          <button

            onClick={async()=>{

              if(helpful){
                return;
              }

              try{

                await markReviewHelpful(
                  review._id
                );

                review.helpfulVotes =
                (review.helpfulVotes || 0) + 1;

                setHelpful(true);

              }
              catch(error){

                console.error(error);

              }

            }}

            className={`
            flex
            items-center
            gap-2

            px-4
            py-2

            rounded-full

            transition-all

            ${
              helpful
              ? "bg-black text-white"
              : "border"
            }
            `}
          >

            <ThumbsUp size={16} />

            Helpful (
              {
                review.helpfulVotes || 0
              }
            )

          </button>

        </div>

      </motion.div>

    </>

  );

}